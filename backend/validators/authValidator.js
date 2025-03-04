const { body } = require("express-validator");

const validateRegister = [
  body("firstname").notEmpty().withMessage("FirstName is required"),
  body("secondname").notEmpty().withMessage("SecondName is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("birth_date").notEmpty().withMessage("BirthDate is required"),
  body("phone").isMobilePhone().withMessage("Invalid phone number"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password must be at least 6 characters long"),
];

const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { validateRegister, validateLogin };
