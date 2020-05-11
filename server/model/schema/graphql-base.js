const { gql } = require('apollo-server-express');

const baseSchema = gql`
  # scalar Date
  # type ListMetadata {
  #   count: Int!
  # }
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

module.exports = baseSchema;
