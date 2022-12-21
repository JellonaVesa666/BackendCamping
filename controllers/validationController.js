const { check, validationResult } = require('express-validator');

exports.runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  next();
};

exports.userRegisterValidator = [
  check('email')
    .isEmail() // Check if is email format correct
    .withMessage('Must be a valid email address'),
  check('password')
    .isLength({ min: 6 }) // Check if password is min lenght
    .withMessage('Password must be at least 6 characters')
    .matches(/\d/) // Check if password contains a number
    .withMessage('Password must contain a number')
];