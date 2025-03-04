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

module.exports = {
  validateTransferFunds,
  validateWithdrawFunds,
  validateGetFundsData,
};
