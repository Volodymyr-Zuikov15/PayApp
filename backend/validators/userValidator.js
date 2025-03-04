const { body, param } = require("express-validator");

const validateUpdateUser = [
  param("id").isMongoId().withMessage("Invalid user ID"),
  body("firstname").optional().isString().withMessage("FirstName must be a string"),
  body("secondname").optional().isString().withMessage("SecondName must be a string"),
  body("birth_date").optional().isString().withMessage("BirthDate must be a string"),
  body("email").optional().isEmail().withMessage("Invalid email format"),
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number format"),
];

const validateAvatarUser = [
  param("id").isMongoId().withMessage("Invalid user ID"),
];

module.exports = { validateUpdateUser, validateAvatarUser };
