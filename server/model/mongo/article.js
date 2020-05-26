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
    }],
    topic_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    }],
    resource_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
    }],
    ndla_subject_ids: [{
      type: String,
    }],
    ndla_topic_ids: [{
      type: String,
    }],
    ndla_resource_ids: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  },
);

const mongoModel = mongoose.model('Article', mongoSchema);

module.exports = mongoModel;
