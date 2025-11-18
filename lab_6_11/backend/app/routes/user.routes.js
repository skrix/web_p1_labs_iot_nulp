const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller.js");
const { authenticate } = require("../middleware/auth.middleware.js");

router.post("/sign-up", users.signUp);
router.post("/sign-in", users.signIn);
router.get("/profile", authenticate, users.getProfile);

module.exports = router;
