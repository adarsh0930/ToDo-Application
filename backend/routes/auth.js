const express = require("express");
const signUp = require("../controllers/auth/signup");
const login = require("../controllers/auth/login");
const authorize = require("../middleware/auth-middleware");
const logout = require("../controllers/auth/logout");

const router = express.Router();
router.post("", signUp);
router.post("/login", login);
router.post("/logout", authorize, logout);

module.exports = router;
