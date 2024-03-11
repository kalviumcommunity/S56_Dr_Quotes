const Joi = require('joi');

// Reusable validator function
const validator = (schema) => (payload) => schema.validate(payload, { abortEarly: false });

// Validation schema for adding
const addQuoteSchema = Joi.object({
  content: Joi.string().required(),
  speaker: Joi.string().required(),
  authorName: Joi.string().required(),
  authorBirthdate: Joi.date().required(),
  profileimg: Joi.string().uri().required()
});

// Validation schema for updating
const updateQuoteSchema = Joi.object({
  content: Joi.string(),
  speaker: Joi.string(),
  authorName: Joi.string(),
  authorBirthdate: Joi.date(),
  profileimg: Joi.string().uri()
});

// Create validator functions for add and update schemas
const validateAddQuote = validator(addQuoteSchema);
const validateUpdateQuote = validator(updateQuoteSchema);

module.exports = { validateAddQuote, validateUpdateQuote };
