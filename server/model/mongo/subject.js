const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema(
  {
    ndla_id: {
      type: String,
      required: '{PATH} is required!',
      unique: true,
    },
    contentUri: {
      type: String,
    },
    name: {
      type: String,
    },
    path: {
      type: String,
    },
    grepCodes: [{
      type: String,
    }],
    topic_ndla_ids: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  },
);

const mongoModel = mongoose.model('Subject', mongoSchema);

module.exports = mongoModel;
