const { body } = require("express-validator");

const createForm = [
  body("title", "Please enter valid title").exists().trim().notEmpty(),
  body("fields", "Please enter valid fields").exists().isArray({ min: 1 }),
  body("fields.*.title", "Please enter valid field title").exists().notEmpty(),
  body("fields.*.type", "Please enter valid field title").exists(),
];

const updateForm = [...createForm];

module.exports = {
  createForm,
  updateForm,
};
