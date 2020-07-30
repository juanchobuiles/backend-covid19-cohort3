const joi = require('@hapi/joi');
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const _uidSchema = joi.string();
const emailSchema = joi
  .string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'co', 'es', 'net'] } });
const passwordSchema = joi.string();
const firstNameSchema = joi.string().min(3);
const lastNameSchema = joi.string().min(3);
const yearsOldSchema = joi.number().integer().min(1).max(99);
const countrySchema = joi.string().min(3);
const citySchema = joi.string().min(3);

const createUserSchema = {
  _uid: _uidSchema.required(),
  first_name: firstNameSchema.required(),
  last_name: lastNameSchema,
  years_old: yearsOldSchema,
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
  _uidSchema,
  createUserSchema,
  updateUserSchema,
};
