const { check } = require("express-validator");

const validationPassword = /^(?=.*[A-z])(?=.*[0-9])[a-zA-z0-9].{6,}$/;
const validationLogin = /^[a-zA-Z0-9_-]{6,}$/;

module.exports = [
  check("login")
    .notEmpty()
    .isString()
    .matches(validationLogin)
    .withMessage("Логин должен содержать не менее 6 символов."),
  check("password")
    .notEmpty()
    .isString()
    .matches(validationPassword)
    .withMessage("Пароль должен содержать не менее 6 символов, латинские буквы и минимум 1 цифру.")
];
