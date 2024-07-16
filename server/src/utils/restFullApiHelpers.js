const { validationResult, body,param } = require("express-validator")

const bodyRequiredField = (field) =>
  body(field)
    .exists()
    .withMessage("Não pode ser indefinido")
    .notEmpty()
    .withMessage("Precisa ser preenchido");

const bodyRequiredFieldNumber = (field) =>
  body(field)
    .exists()
    .withMessage("Não pode ser indefinido")
    .isNumeric()
    .withMessage("Precisa ser numero")
    .notEmpty()
    .withMessage("Precisa ser preenchido");

const bodyRequiredFieldBoolean = (field) =>
  body(field)
    .exists()
    .withMessage("Não pode ser indefinido")
    .isBoolean()
    .withMessage("Precisa ser verdadeiro ou falso")
    .notEmpty()
    .withMessage("Precisa ser preenchido");
const paramRequiredField = (field) =>
  param(field)
    .exists()
    .withMessage("Não pode ser indefinido")
    .notEmpty()
    .withMessage("Precisa ser preenchido");

const expressValidatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(400).json({ errors: errors.array() });
  }
};

module.exports = {
  expressValidatorMiddleware,
  bodyRequiredFieldBoolean,
  bodyRequiredFieldNumber,
  paramRequiredField,
  bodyRequiredField
}