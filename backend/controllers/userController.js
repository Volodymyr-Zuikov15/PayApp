const { validationResult } = require("express-validator");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params; 
  const { firstname, secondname, birth_date, email, phone } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstname = firstname || user.firstname;
    user.secondname = secondname || user.secondname;
    user.username = firstname + " " + "secondname";
    user.birth_date = birth_date || user.birth_date;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        id: updatedUser.id,
        firstname: updatedUser.firstname,
        secondname: updatedUser.secondname,
        username: updatedUser.username,
        birth_date: updatedUser.birth_date,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Setup multer for avatar image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      const uploadPath = "uploads/avatars/";
      if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const filename = `avatar_${req.params.id}_${Date.now()}${fileExtension}`;
      cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif/;
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
      const mimetype = allowedTypes.test(file.mimetype);
      if (extname && mimetype) {
          return cb(null, true);
      } else {
          cb(new Error("Only image files are allowed!"));
      }
  },
}).single("avatar"); // Single file upload with field name 'avatar'

const avatarUser = async (req, res) => {
  upload(req, res, async (err) => {
      if (err) {
          return res.status(400).json({ message: err.message });
      }

      try {
          const user = await User.findById(req.params.id);
          if (!user) {
              return res.status(404).json({ message: "User not found" });
          }

          const avatarPath = `uploads/avatars/${req.file.filename}`;
          user.avatar = avatarPath; // Update the avatar field in the user's profile

          await user.save();
          res.status(200).json({ message: "Avatar updated successfully", avatar: avatarPath });
      } catch (error) {
          res.status(500).json({ message: "An error occurred while updating the avatar", error: error.message });
      }
  });
};

module.exports = { updateUser, avatarUser };
