const joi = require('@hapi/joi');
const { categoryIdSchema } = require('./category') || null;
const tutorialIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const titleSchema = joi.string().min(3).max(50);
const descriptionSchema = joi.string().min(3).max(300);
const urlSchema = joi.string().uri();

const createTutorialSchema = {
  title: titleSchema.required(),
  description: descriptionSchema.required(),
  category: categoryIdSchema,
  url_tutorial: urlSchema.required(),
};
const updateTutorialSchema = {
  title: titleSchema,
  description: descriptionSchema,
  category: categoryIdSchema,
  url_tutorial: urlSchema,
};

module.exports = {
  tutorialIdSchema,
  createTutorialSchema,
  updateTutorialSchema,
};
