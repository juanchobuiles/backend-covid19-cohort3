const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
  name_category: String,
});

module.exports = category;
