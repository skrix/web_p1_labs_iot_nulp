const express = require("express");
const router = express.Router();
const books = require("../controllers/book.controller.js");

router.post("/", books.create);
router.get("/", books.findAll);
router.get("/:id", books.findOne);
router.put("/:id", books.update);
router.delete("/:id", books.delete);

module.exports = router;
