const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller.js");

router.post("/sign-up", users.signUp);
router.post("/sign-in", users.signIn);

module.exports = router;
