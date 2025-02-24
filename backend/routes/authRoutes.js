const express = require("express");
const {
  register,
  login,
  logout,
  sendVerificationCode,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/sendverificationcode", sendVerificationCode);

module.exports = router;
