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
      required: '{PATH} is required!',
    },
    path: {
      type: String,
    },
    paths: [{
      type: String,
    }],
    metaId: {
      type: String,
    },
    metaTitle: {
      type: String,
    },
    metaIntroduction: {
      type: String,
    },
    metaDescription: {
      type: String,
    },
    grepCodes: [{
      type: String,
    }],
    subject_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
    }],
    topic_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    }],
    article_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Article',
    }],
    ndla_subject_ids: [{
      type: String,
    }],
    ndla_topic_ids: [{
      type: String,
    }],
    ndla_article_ids: [{
      type: String,
    }],
  },
  {
    timestamps: true,
  },
);

const mongoModel = mongoose.model('Resource', mongoSchema);

module.exports = mongoModel;
