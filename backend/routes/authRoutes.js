const express = require("express");
const {
  register,
  login,
  getUserDetails,
  // logout,
} = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/logout", logout);
router.get("/fetch-user", getUserDetails);

module.exports = router;
