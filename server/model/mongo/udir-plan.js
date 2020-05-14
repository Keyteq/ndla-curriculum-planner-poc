const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema(
  {
    originalname: {
      type: String,
      required: '{PATH} is required!',
    },
    encoding: {
      type: String,
      required: '{PATH} is required!',
    },
    mimetype: {
      type: String,
      required: '{PATH} is required!',
    },
    buffer: {
      type: Buffer,
      required: '{PATH} is required!',
    },
  },
  {
    timestamps: true,
  },
);

const mongoModel = mongoose.model('UdirPlan', mongoSchema);

module.exports = mongoModel;
