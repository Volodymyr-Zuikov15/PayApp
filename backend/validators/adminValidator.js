const { body } = require("express-validator");

// Validation middleware
const validateUpdateUser = [
    body("firstname").notEmpty().withMessage("FirstName is required"),
    body("secondname").notEmpty().withMessage("SecondName is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("birth_date").isMobilePhone().withMessage("BirthDate is required"),
    body("phone").isMobilePhone().withMessage("Invalid phone number"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

module.exports = { validateUpdateUser };