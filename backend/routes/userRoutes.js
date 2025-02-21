const express = require("express");
const {
  createUser,
  updateManager,
  deleteUser,
} = require("../controllers/userController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authenticate, createUser);
router.put("/:id", authenticate, updateManager);
router.delete("/:id", authenticate, deleteUser);

module.exports = router;
