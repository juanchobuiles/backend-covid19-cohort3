const joi = require('@hapi/joi');
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const emailSchema = joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'co', 'es', 'net'] } });
const passwordSchema = joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
const firstNameSchema = joi.string().min(3);
const lastNameSchema = joi.string().min(3);
const yearsOldSchema = joi.number().integer().min(1).max(99);
const countrySchema = joi.string().min(3);
const citySchema = joi.string().min(3);

const createUserSchema = {
  email: emailSchema.required(),
  password: passwordSchema.required(),
  firstName: firstNameSchema.required(),
  lastName: lastNameSchema,
  yearsOld: yearsOldSchema,
  country: countrySchema,
  city: citySchema,
};
const updateUserSchema = {
  password: passwordSchema.required(),
  firstName: firstNameSchema.required(),
  lastName: lastNameSchema,
  yearsOld: yearsOldSchema,
  country: countrySchema,
  city: citySchema,
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
};
