const Joi = require('joi');

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

module.exports = { addQuoteSchema, updateQuoteSchema };
