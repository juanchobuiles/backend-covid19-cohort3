const joi = require('@hapi/joi');
const testIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const testSchema = joi.object({
  question_1: joi.boolean(),
  question_2: joi.boolean(),
  question_3: joi.object({
    a: joi.boolean(),
    b: joi.boolean(),
    c: joi.boolean(),
    d: joi.boolean(),
    e: joi.boolean(),
    f: joi.boolean(),
    g: joi.boolean(),
    h: joi.boolean(),
    i: joi.boolean(),
  }),
  question_4: joi.object({
    a: joi.boolean(),
    b: joi.boolean(),
  }),
  date: joi.date().iso(),
});

const createTestSchema = {
  id_user: userIdSchema.required(),
  test: testSchema.required(),
};

module.exports = {
  testIdSchema,
  createTestSchema,
};
