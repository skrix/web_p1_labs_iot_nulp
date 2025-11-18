const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const ProductItem = db.ProductItem;
const User = db.User;
const Carrier = db.Carrier;

exports.create = async (req, res) => {
  const transaction = await db.sequelize.transaction();

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      carrierId,
      pickupLocation,
      paymentMethod,
      items,
      notes
    } = req.body;

    const userId = req.user.id;

    // Validate order has items
    if (!items || !Array.isArray(items) || items.length === 0) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Order must contain at least one item"
      });
    }

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !city || !pickupLocation || !paymentMethod) {
      await transaction.rollback();
      return res.status(400).json({
        message: "Missing required order information"
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      if (!item.productItemId) {
        await transaction.rollback();
        return res.status(400).json({
          message: "ProductItemId is required. Cannot order without selecting a specific variant."
        });
      }

      // Fetch ProductItem with lock to prevent race conditions
      const productItem = await ProductItem.findByPk(item.productItemId, {
        transaction,
        lock: transaction.LOCK.UPDATE
      });

      if (!productItem) {
        await transaction.rollback();
        return res.status(404).json({
          message: `ProductItem with id ${item.productItemId} not found`
        });
      }

      // Validate ProductItem belongs to the specified Product
      if (productItem.productId !== item.productId) {
        await transaction.rollback();
        return res.status(400).json({
          message: `ProductItem ${item.productItemId} does not belong to Product ${item.productId}`
        });
      }

      // Validate availability and stock
      if (!productItem.isAvailable) {
        await transaction.rollback();
        return res.status(400).json({
          message: `ProductItem "${productItem.variation}" is not available`
        });
      }

      if (productItem.stock < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({
          message: `Insufficient stock for "${productItem.variation}". Available: ${productItem.stock}, requested: ${item.quantity}`
        });
      }

      // Calculate item total
      const itemTotal = parseFloat(productItem.price) * item.quantity;
      totalAmount += itemTotal;

      // Decrement stock atomically
      await productItem.decrement('stock', {
        by: item.quantity,
        transaction
      });

      // Add to order items
      orderItems.push({
        productId: item.productId,
        productItemId: productItem.id,
        variation: productItem.variation,
        quantity: item.quantity,
        price: productItem.price,
        currency: productItem.currency
      });
    }

    const order = await Order.create({
      userId,
      firstName,
      lastName,
      email,
      phone,
      city,
      carrierId,
      pickupLocation,
      paymentMethod,
      amount: totalAmount,
      currency: "UAH",
      status: "pending",
      notes
    }, { transaction });

    await Promise.all(
      orderItems.map(item =>
        OrderItem.create({
          ...item,
          orderId: order.id
        }, { transaction })
      )
    );

    // Commit transaction
    await transaction.commit();

    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"]
        },
        {
          model: Carrier,
          as: "carrier",
          attributes: ["id", "name", "code"]
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "title", "image", "price"]
            },
            {
              model: ProductItem,
              as: "productItem",
              attributes: ["id", "variation", "sku", "price", "description"]
            }
          ]
        }
      ]
    });

    res.status(201).json(completeOrder);
  } catch (err) {
    await transaction.rollback();
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { status, paymentMethod } = req.query;

    let where = {
      userId: req.user.id
    };

    if (status) {
      where.status = status;
    }
    if (paymentMethod) {
      where.paymentMethod = paymentMethod;
    }

    const orders = await Order.findAll({
      where,
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"]
        },
        {
          model: Carrier,
          as: "carrier",
          attributes: ["id", "name", "code"]
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "title", "image", "price"]
            },
            {
              model: ProductItem,
              as: "productItem",
              attributes: ["id", "variation", "sku", "price", "description"]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"]
        },
        {
          model: Carrier,
          as: "carrier",
          attributes: ["id", "name", "code"]
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "title", "description", "image", "price"]
            },
            {
              model: ProductItem,
              as: "productItem",
              attributes: ["id", "variation", "sku", "price", "description"]
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Verify user owns this order
    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      carrierId,
      pickupLocation,
      paymentMethod,
      notes
    } = req.body;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Verify user owns this order
    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (["shipped", "delivered", "cancelled"].includes(order.status)) {
      return res.status(400).json({
        message: "Cannot update order in current status"
      });
    }

    await order.update({
      firstName,
      lastName,
      email,
      phone,
      city,
      carrierId,
      pickupLocation,
      paymentMethod,
      notes
    });

    const updatedOrder = await Order.findByPk(id, {
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"]
        },
        {
          model: Carrier,
          as: "carrier",
          attributes: ["id", "name", "code"]
        },
        {
          model: OrderItem,
          as: "items",
          include: [
            {
              model: Product,
              as: "product",
              attributes: ["id", "title", "image", "price"]
            },
            {
              model: ProductItem,
              as: "productItem",
              attributes: ["id", "variation", "sku", "price", "description"]
            }
          ]
        }
      ]
    });

    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Verify user owns this order
    if (order.userId !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        message: "Can only delete pending orders"
      });
    }

    await order.destroy();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
