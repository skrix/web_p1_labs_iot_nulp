const db = require("../models");
const Order = db.Order;
const OrderItem = db.OrderItem;
const Product = db.Product;
const User = db.User;
const Carrier = db.Carrier;

exports.create = async (req, res) => {
  try {
    const {
      userId,
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

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one item"
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product with id ${item.productId} not found`
        });
      }

      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
        currency: product.currency || "UAH"
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
    });

    await Promise.all(
      orderItems.map(item =>
        OrderItem.create({
          ...item,
          orderId: order.id
        })
      )
    );

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
            }
          ]
        }
      ]
    });

    res.status(201).json(completeOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const { status, userId, paymentMethod } = req.query;

    let where = {};
    if (status) {
      where.status = status;
    }
    if (userId) {
      where.userId = userId;
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
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
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
