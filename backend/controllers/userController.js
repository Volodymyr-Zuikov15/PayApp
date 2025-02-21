const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import your User model
const { validationResult } = require("express-validator"); // Optional, for validation

// OWNER

// Super Admin
// Admin
// Employee

const createUser = async (req, res) => {
  // Validate incoming request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }

  const { email, password, name } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        errors: [{ field: "email", message: "User already exists" }],
      });
    }

    // Hash the password before saving

    // Create new user object
    const newUser = new User({
      name,
      email,
      password: password,
      role,
    });

    // Save the user in the database
    await newUser.save();

    // Respond with the created user details (excluding password)
    res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error);

    // Check if the error is a Mongoose validation error
    if (error.name === "ValidationError") {
      // Extract field-specific errors from Mongoose validation
      const fieldErrors = Object.entries(error.errors).map(([field, err]) => ({
        field,
        message: err.message,
      }));
      return res.status(400).json({ errors: fieldErrors });
    }

    // General error handling
    res.status(500).json({
      errors: [
        { field: "general", message: "Server error. Please try again later." },
      ],
    });
  }
};

// Controller to delete a manager
const deleteUser = async (req, res) => {
  const { _id } = req.user; // Current user's ID from the request
  const { id } = req.params; // User ID to be deleted from the route parameter

  try {
    // Fetch the target user to be deleted
    const targetUser = await User.findById(id).exec();
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    // Ensure the current user has the authority to delete the target user
    if (currentRole <= targetRole) {
      return res
        .status(403)
        .json({ message: "You do not have permission to delete this user" });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User has been deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const updateManager = async (req, res) => {
  const { id } = req.params; // Manager ID from the route parameter
  const { name, email, phone } = req.body; // Updated details from the request body

  try {
    // Find the manager by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Manager not found" });
    }

    // Update the manager fields if provided
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    // Save the updated manager to the database
    const updatedUser = await user.save();

    res.status(200).json({
      message: "Manager updated successfully",
      manager: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role, // Include role if necessary
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createUser, updateManager, deleteUser };
