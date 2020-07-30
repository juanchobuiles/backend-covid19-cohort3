const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the schema for model user on database
const user = new Schema(
  {
    _uid: String,
    first_name: String,
    last_name: String,
    years_old: Number,
    country: String,
    city: String,
  },
  { timestamps: true }
);

module.exports = user;
