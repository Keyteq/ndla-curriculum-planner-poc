const mongoose = require('mongoose');

const models = require('./mongo');
const schema = require('./schema');

const mongoConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  retryWrites: false,
  useFindAndModify: false,
};

function mongooseConnect(connStr) {
  if (connStr) {
    console.log('Connecting to mongo db...');
    return mongoose.connect(connStr, mongoConfig);
  }
  throw new Error('Unable to connect to db, missing connection string.');
}

module.exports = {
  mongooseConnect,
  models,
  schema,
};
