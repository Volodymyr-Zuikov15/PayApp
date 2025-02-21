const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify token and attach user and company details to the request
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = { ...user.toObject() };
    next();
  } catch (error) {
    console.error("Token error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to validate roles
const authorize = (requiredRoles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!requiredRoles.includes(role)) {
      return res.status(403).json({
        message: "You do not have permission to access this resource",
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
