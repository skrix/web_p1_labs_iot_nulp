const db = require("../models");
const ProductItem = db.ProductItem;
const Product = db.Product;

// Create a new ProductItem
exports.create = async (req, res) => {
  try {
    const { productId, variation, sku, price, currency, stock, isAvailable, description, image } = req.body;

    // Verify product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if SKU already exists
    const existingSku = await ProductItem.findOne({ where: { sku } });
    if (existingSku) {
      return res.status(400).json({
        message: `SKU "${sku}" already exists for ProductItem ID ${existingSku.id}`
      });
    }

    // Validate required fields
    if (!variation || !sku || !price) {
      return res.status(400).json({
        message: "Missing required fields: variation, sku, and price are required"
      });
    }

    const productItem = await ProductItem.create({
      productId,
      variation,
      sku,
      price,
      currency: currency || 'UAH',
      stock: stock || 0,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      description,
      image
    });

    res.status(201).json(productItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all ProductItems for a specific product
exports.findByProduct = async (req, res) => {
  try {
    const productId = req.params.productId;

    const productItems = await ProductItem.findAll({
      where: { productId },
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "title", "description"]
        }
      ],
      order: [["variation", "ASC"]]
    });

    res.status(200).json(productItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single ProductItem by ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const productItem = await ProductItem.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "title", "description"]
        }
      ]
    });

    if (!productItem) {
      return res.status(404).json({ message: "ProductItem not found" });
    }

    res.status(200).json(productItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a ProductItem
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    const productItem = await ProductItem.findByPk(id);

    if (!productItem) {
      return res.status(404).json({ message: "ProductItem not found" });
    }

    // If SKU is being updated, check for uniqueness
    if (updateData.sku && updateData.sku !== productItem.sku) {
      const existingSku = await ProductItem.findOne({ where: { sku: updateData.sku } });
      if (existingSku) {
        return res.status(400).json({
          message: `SKU "${updateData.sku}" already exists for ProductItem ID ${existingSku.id}`
        });
      }
    }

    await productItem.update(updateData);

    const updatedProductItem = await ProductItem.findByPk(id, {
      include: [
        {
          model: Product,
          as: "product",
          attributes: ["id", "title", "description"]
        }
      ]
    });

    res.status(200).json(updatedProductItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a ProductItem
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const productItem = await ProductItem.findByPk(id);

    if (!productItem) {
      return res.status(404).json({ message: "ProductItem not found" });
    }

    await productItem.destroy();
    res.status(200).json({ message: "ProductItem deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
