const express = require("express");
const {
  register,
  login,
  sendVerificationCode,
  // getUserDetails,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/sendverificationcode", sendVerificationCode);

// router.get("/fetch-user", getUserDetails);

module.exports = router;
