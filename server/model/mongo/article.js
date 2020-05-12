const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema(
  {
    ndla_id: {
      type: String,
      required: '{PATH} is required!',
      unique: true,
    },
    title: {
      type: String,
      required: '{PATH} is required!',
    },
    grepCodes: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  },
);

const mongoModel = mongoose.model('Article', mongoSchema);

module.exports = mongoModel;
