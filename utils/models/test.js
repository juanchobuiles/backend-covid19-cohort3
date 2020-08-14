const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// This is the schema for model test on database
const test = new Schema(
  {
    id_user: String,
    test: [
      {
        question_1: Boolean,
        question_2: Boolean,
        question_3: {
          a: Boolean,
          b: Boolean,
          c: Boolean,
          d: Boolean,
          e: Boolean,
          f: Boolean,
          g: Boolean,
          h: Boolean,
          i: Boolean,
        },
        question_4: {
          a: Boolean,
          b: Boolean,
        },
        date: Date,
        result: {
          alert: String,
          message: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = test;
