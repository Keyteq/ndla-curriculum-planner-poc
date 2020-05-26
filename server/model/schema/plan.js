const { gql } = require('apollo-server-express');

const gqlSchema = gql`
  extend type Query {
    plan(id: ID!): plan!
  }

  # Batch Base
  type plan {
    id: ID!
    list: [resource!]
  }

  type resource {
    id: String!
    name: String
    contentUri: String
    path: String
    paths: [String!]
    metaId: String
    metaTitle: String
    metaIntroduction: String
    metaDescription: String
    grepCodes: [String!]

    article: article

    subject_ids: [ID!]
    topic_ids: [ID!]
    article_ids: [ID!]
    ndla_subject_ids: [String!]
    ndla_topic_ids: [String!]
    ndla_article_ids: [String!]
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
