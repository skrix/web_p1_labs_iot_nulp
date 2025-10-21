const express = require("express");
const router = express.Router();
const orderItems = require("../controllers/orderItem.controller.js");

router.post("/", orderItems.create);
router.get("/", orderItems.findAll);
router.get("/:id", orderItems.findOne);
router.put("/:id", orderItems.update);
router.delete("/:id", orderItems.delete);

module.exports = router;
