const express = require("express");
const {
    updateUser,
    avatarUser
} = require("../controllers/userController");
const { validateUpdateUser, validateAvatarUser } = require("../validators/userValidator");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

router.put("/update/:id", [authenticate, validateUpdateUser], updateUser);
router.put("/avatar/:id", [authenticate, validateAvatarUser], avatarUser);

module.exports = router;
