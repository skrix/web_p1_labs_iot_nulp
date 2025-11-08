const express = require("express");
const router = express.Router();
const carriers = require("../controllers/carrier.controller.js");

router.post("/", carriers.create);
router.get("/", carriers.findAll);
router.get("/:id", carriers.findOne);
router.put("/:id", carriers.update);
router.delete("/:id", carriers.delete);

module.exports = router;
