const express = require("express");
const router = express.Router();
const productItemController = require("../controllers/productItem.controller");

// Create a new ProductItem
router.post("/", productItemController.create);

// Get all ProductItems for a specific product
router.get("/product/:productId", productItemController.findByProduct);

// Get a single ProductItem by ID
router.get("/:id", productItemController.findOne);

// Update a ProductItem
router.put("/:id", productItemController.update);

// Delete a ProductItem
router.delete("/:id", productItemController.delete);

module.exports = router;
