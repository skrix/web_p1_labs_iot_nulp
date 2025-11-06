const express = require("express");
const router = express.Router();
const brands = require("../controllers/brand.controller.js");

router.post("/", brands.create);
router.get("/", brands.findAll);
router.get("/:id", brands.findOne);
router.put("/:id", brands.update);
router.delete("/:id", brands.delete);

module.exports = router;
