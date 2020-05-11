const { gql } = require('apollo-server-express');

const schema = gql`
  interface ndla {
    id: String!
    slug: String!
    type: String!
  }
`;

module.exports = schema;
