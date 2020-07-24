const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true, minlength: 8 },
  firstName: { type: String, required: true, minlength: 3 },
  lastName: { type: String, minlength: 3 },
  yearsOld: { type: Number, min: 1, max: 100 },
  country: { type: String, minlength: 3 },
  city: { type: String, minlength3 },
});

module.exports = user;
