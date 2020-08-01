const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the schema for model auth on database
const auth = new Schema(
  {
    email: String,
    password: String,
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = auth;
