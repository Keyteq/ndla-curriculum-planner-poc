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
    // TODO: Not an ideal data struct, but the fastest way to do this. (subject_ids && topic_ids)
    subject_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: '{PATH} is required!',
    }],
    topic_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      required: '{PATH} is required!',
    }],
  },
  {
    timestamps: true,
  },
);

const mongoModel = mongoose.model('Article', mongoSchema);

module.exports = mongoModel;
