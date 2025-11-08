const express = require("express");
const router = express.Router();
const carrierLocations = require("../controllers/carrierLocation.controller.js");

router.post("/", carrierLocations.create);
router.get("/", carrierLocations.findAll);
router.get("/:id", carrierLocations.findOne);
router.put("/:id", carrierLocations.update);
router.delete("/:id", carrierLocations.delete);

module.exports = router;
