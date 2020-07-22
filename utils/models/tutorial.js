const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorial = new Schema({
  title: String,
  description: String,
  category: String,
  url_tutorial: String,
});

module.exports = tutorial;
