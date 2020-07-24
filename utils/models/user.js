const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({

 firstName: { type: String, required: true, minlength: 3 },
  lastName: { type: String, minlength: 3 },
  yearsOld: { type: Number, min: 1, max: 100 },
  country: { type: String, minlength: 3 },
  city: { type: String, minlength:3 }
}, { timestamps: true });

module.exports = mongoose.model('User', user);
