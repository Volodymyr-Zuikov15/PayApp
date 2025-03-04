const express = require("express");
const {
  register,
  login,
  logout,
  sendVerificationCode,
} = require("../controllers/authController");
const { validateRegister, validateLogin } = require("../validators/authValidator");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);
router.post("/sendverificationcode", sendVerificationCode);

module.exports = router;
