const Joi = require('joi');

// Reusable validator function
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

const authorSchema = Joi.object({
  name: Joi.string().required(),
  birthdate: Joi.date().required(),
  profileimg: Joi.string().uri().required()
});
// Validation schema for adding
const addQuoteSchema = Joi.object({
name: Joi.string().trim().required(),
content: Joi.string().trim().required(),
speaker: Joi.string().trim().required(),
});

// Validation schema for updating
const updateQuoteSchema = Joi.object({
name: Joi.string().trim().required(),
content: Joi.string().trim().required(),
speaker: Joi.string().trim().required(),
});

// Create validator functions for add and update schemas
const validateAddQuote = validator(addQuoteSchema);
const validateUpdateQuote = validator(updateQuoteSchema);

module.exports = { validateAddQuote, validateUpdateQuote };
