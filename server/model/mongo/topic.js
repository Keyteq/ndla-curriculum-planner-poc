const mongoose = require('mongoose');

const mongoSchema = new mongoose.Schema(
  {
    ndla_id: {
      type: String,
      required: '{PATH} is required!',
    },
  },
  {
    timestamps: true,
  },
);

const mongoModel = mongoose.model('Topic', mongoSchema);

module.exports = mongoModel;
