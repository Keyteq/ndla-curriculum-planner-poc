const express = require('express');
const { v4: uuid } = require('uuid');
const { ApolloServer } = require('apollo-server-express');

const { schema } = require('./model');
const controllers = require('./controllers');
const resolvers = require('./resolvers');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';

const app = express();

const apiPath = (path) => `/api/v1/${path}`;

const createContext = () => ({
  invocationId: uuid(),
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

// For all paths not defined return 404;
app.get('*', (req, res) => {
  res.status(404).json({
    payload: {
      code: 'E_NOT_FOUND',
      message: 'Resource not found',
    },
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 ndla-api express Server ready at http://${HOST}:${PORT}/api/v1/`);
  // eslint-disable-next-line no-console
  console.log(`🚀 ndla-api GQL ready at http://${HOST}:${PORT}/api/v1/graphql`);
});
