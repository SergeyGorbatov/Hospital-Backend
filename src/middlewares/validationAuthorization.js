const { check } = require('express-validator');

module.exports = [
  check('login')
    .notEmpty()
    .isString()
    .isLength({ min: 6 }),
  check('password')
    .notEmpty()
    .isString()
    .isLength({ min: 6 })
];
