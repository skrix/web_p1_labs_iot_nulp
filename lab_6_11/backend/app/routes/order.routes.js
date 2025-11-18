const express = require("express");
const router = express.Router();
const orders = require("../controllers/order.controller.js");
const { authenticate } = require("../middleware/auth.middleware.js");

router.post("/", authenticate, orders.create);
router.get("/", authenticate, orders.findAll);
router.get("/:id", authenticate, orders.findOne);
router.put("/:id", authenticate, orders.update);
router.delete("/:id", authenticate, orders.delete);

module.exports = router;
