
const { body, validationResult } = require('express-validator');

const validate = {};

/* **********************************
 * Customer Registration Validation Rules
 * ********************************* */
validate.registrationRules = () => {
  return [
    // First name is required and must be a string with at least 3 characters
    body('firstName')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('First Name is required.')
      .isLength({ min: 3 })
      .withMessage('First Name should be 3 or more characters.'),

    // Last name is required and must be a string with at least 3 characters
    body('lastName')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Last Name is required.')
      .isLength({ min: 3 })
      .withMessage('Last Name should be 3 or more characters.'),

    // Valid email is required
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid email is required.'),

    // ITIN (Individual Tax Identification Number) is required and must be numeric
    body('itin')
      .escape()
      .notEmpty()
      .withMessage('ITIN is required.')
      .isNumeric()
      .withMessage('ITIN must be numeric.')
      .isLength({ min: 4 })
      .withMessage('ITIN must be at least 4 digits.'),

    // Business name is required
    body('businessName') // Updated from `busninessName` to `businessName`
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Please provide a Business Name.'),

    // Phone number is required and must be numeric
    body('phoneNumber')
      .escape()
      .notEmpty()
      .withMessage('Phone number is required.')
      .isNumeric()
      .withMessage('Phone number must be numeric.')
      .isLength({ min: 7 })
      .withMessage('Phone number must be at least 7 digits.'),

    // Address is required
    body('address')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Please provide a valid Business Address.'),
  ];
};

/* **********************************
 * Middleware to Handle Validation Errors
 * ********************************* */
validate.checkValidationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
