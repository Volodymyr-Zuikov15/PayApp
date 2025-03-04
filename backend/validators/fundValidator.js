const { body, query } = require("express-validator");

const validateTransferFunds = [
  body("account").notEmpty().withMessage("Account is required"),
  body("idNumber").notEmpty().withMessage("ID Number is required"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  body("user_id").notEmpty().withMessage("User ID is required"),
];

const validateWithdrawFunds = [
  body("idNumber").notEmpty().withMessage("ID Number is required"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  body("user_id").notEmpty().withMessage("User ID is required"),
];

const validateGetFundsData = [
  query("user_id").notEmpty().withMessage("User ID is required"),
];

const validateActivateUserPlan = [
  query("id").notEmpty().withMessage("User ID is required"),
  body("plan").notEmpty().withMessage("Plan is required"),
];

const validateDeleteNotification = [
  query("id").notEmpty().withMessage("Notification ID is required"),
];

module.exports = {
  validateTransferFunds,
  validateWithdrawFunds,
  validateGetFundsData,
  validateActivateUserPlan,
  validateDeleteNotification
};
