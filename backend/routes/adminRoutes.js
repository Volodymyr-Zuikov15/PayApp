const express = require("express");
const { updateUser } = require("../controllers/adminController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const { validateUpdateUser } = require("../validators/adminValidator");

const router = express.Router();

router.put("/updateUser/:id", [authenticate, authorize(["superadmin"]), validateUpdateUser], updateUser);

module.exports = router;