const { gql } = require('apollo-server-express');

const gqlSchema = gql`
  extend type Query {
    plan(id: ID!): plan!
  }

  # Batch Base
  type plan {
    id: ID!
    list: [article!]
  }

  type article {
    id: String!
    title: String
    introduction: String
    created: String
    updated: String
    published: String
    metaDescription: String
    articleType: String
    supportedLanguages: [String!]
    tags: [String!]
    competenceGoals: [competenceGoals!]
  }

  type competenceGoals {
    id: String
    code: String
    title: String
    curriculum: reference
    competenceGoalSet: reference
    crossSubjectTopics: referenceExplanation
    coreElements: referenceExplanation
  }

  type reference {
    id: String
    code: String
    title: String
  }

  type referenceExplanation {
    reference: reference
    explanation: String
  }

`;

module.exports = gqlSchema;
