const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema(
  {
    ndla_id: {
      type: String,
      required: '{PATH} is required!',
      unique: true,
    },
    name: {
      type: String,
      required: '{PATH} is required!',
    },
    contentUri: {
      type: String,
    },
    grepCodes: [{
      type: String,
    }],
    path: {
      type: String,
    },
    paths: [{
      type: String,
    }],
    isPrimary: {
      type: String,
    },
    parent: {
      type: String,
    },
    sub_topic_ndla_ids: [{
      type: String,
    }],
    article_ndla_ids: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  },
);

const mongoModel = mongoose.model('Topic', mongoSchema);

module.exports = mongoModel;
