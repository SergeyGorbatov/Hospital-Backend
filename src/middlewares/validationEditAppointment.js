const { check } = require("express-validator");

module.exports = [
  check("_id")
    .notEmpty()
    .isString(),
  check("patient")
    .notEmpty()
    .isString()
    .withMessage("Поле Имя не должно быть пустым"),
  check("doctor")
    .notEmpty()
    .isString()
    .withMessage("Поле Врач не должно быть пустым"),
  check("date")
    .notEmpty()
    .toDate()
    .withMessage("Поле Дата не должно быть пустым"),
  check("complaint")
    .notEmpty()
    .isString()
    .withMessage("Поле Жалобы не должно быть пустым"),
];
