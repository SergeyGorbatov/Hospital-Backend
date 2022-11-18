const { check } = require("express-validator");

module.exports = [
  check("_id")
    .notEmpty()
    .isString(),
];