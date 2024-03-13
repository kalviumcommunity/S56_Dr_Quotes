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
  content: Joi.string().required(),
  speaker: Joi.string().required(),
  author: authorSchema.required()
});

// Validation schema for updating
const updateQuoteSchema = Joi.object({
  content: Joi.string().required(),
  speaker: Joi.string().required(),
  author: authorSchema.required()
});

// Create validator functions for add and update schemas
const validateAddQuote = validator(addQuoteSchema);
const validateUpdateQuote = validator(updateQuoteSchema);

module.exports = { validateAddQuote, validateUpdateQuote };
