const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
  first_name: String,
  last_name: String,
  years_old: Number,
  country: String,
  city: String,
}, { timestamps: true });

module.exports = mongoose.model('User', user);
