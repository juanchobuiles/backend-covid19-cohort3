const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auth = new Schema({
  email: String,
  password: String,
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Auth', auth);