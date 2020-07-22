const joi = require('@hapi/joi');

const categoryIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const nameCategorySchema = joi.string().min(3).max(50);

const createCategorySchema = {
  name_category: nameCategorySchema.required(),
};

const updateCategorySchema = {
  name_category: nameCategorySchema,
};

module.exports = {
  categoryIdSchema,
  createCategorySchema,
  updateCategorySchema,
};
