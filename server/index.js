const http = require('http');

const express = require('express');
const { v4: uuid } = require('uuid');
const { ApolloServer } = require('apollo-server-express');
const multer = require('multer');
const cors = require('cors');

const { schema, models, mongooseConnect } = require('./model');
const controllers = require('./controllers');
const resolvers = require('./resolvers');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const app = express();
const upload = multer();

const apiPath = (path) => `/api/v1/${path}`;

const createContext = () => ({
  invocationId: uuid(),
  models,
});

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async (context) => ({
    ...context,
    ndla: createContext(),
  }),
});
server.applyMiddleware({
  app,
  path: apiPath('graphql'),
});

app.use(cors('*'));

/**
 * Set a global context on all requests named min.
 */
app.use((req, res, next) => {
  const context = createContext();
  Object.assign(req, {
    ndla: context,
  });

  next();
});

app.get(apiPath('ping'), controllers.ping);

app.post(apiPath('upload/plan'), upload.single('plan'), controllers.upload.plan);

// For all paths not defined return 404;
app.use((req, res, next) => {
  const err = Object.assign(new Error(http.STATUS_CODES[404]), { code: 'E_NOT_FOUND', status: 404 });
  next(err);
});

// handle handle errors and send json response
app.use((err, req, res, _next) => {
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(status).json({
    payload: {
      code: err.code,
      message: http.STATUS_CODES[status],
    },
  });
});

mongooseConnect(process.env.MONGO_URI).then(async () => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 ndla-api express Server ready at http://${HOST}:${PORT}/api/v1/`);
    // eslint-disable-next-line no-console
    console.log(`🚀 ndla-api GQL ready at http://${HOST}:${PORT}/api/v1/graphql`);
  });
});
