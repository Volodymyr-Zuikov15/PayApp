const { body, param } = require("express-validator");

// Validation middleware
const validateUpdateUser = [
    body("firstname").notEmpty().withMessage("FirstName is required"),
    body("secondname").notEmpty().withMessage("SecondName is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("birth_date").notEmpty().withMessage("BirthDate is required"),
    body("phone").isMobilePhone().withMessage("Invalid phone number"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
    param("id").isMongoId().withMessage("Invalid user ID"),
];

const validateGetUser = [
    param("id").isMongoId().withMessage("Invalid user ID"),
];

const validateUpdatePlan = [
    body("name").notEmpty().withMessage("Name is required"),
    body("prize").notEmpty().withMessage("Prize is required"),
    body("daily_income").notEmpty().withMessage("DailyIncome is required"),
    body("monthly_income").notEmpty().withMessage("MonthlyIncome is required"),
    body("yearly_income").notEmpty().withMessage("YearlyIncome is required"),
    param("id").isMongoId().withMessage("Invalid Plan ID"),
];

const validateGetPlan = [
    param("id").isMongoId().withMessage("Invalid Plan ID"),
];

module.exports = { validateUpdateUser, validateGetUser, validateUpdatePlan, validateGetPlan };