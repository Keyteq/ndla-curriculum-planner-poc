const { sendRequest, getDataRes } = require('../request-helper');

const subjects = async (variables, headers = {}) => getDataRes(sendRequest, [{
  query: `
    query subjects {
      subjects {
        id
        name
        contentUri
        path    
        metadata {
          grepCodes
          visible
        }
        topics {
          id
        }
      }
    }
  `,
  variables,
}, headers]);

const topic = async (variables, headers = {}) => getDataRes(sendRequest, [{
  query: `
    query topic($id: String!) {
      topic(id: $id) {
        id
        name
        contentUri
        path
        paths
        isPrimary
        parent
        subtopics {
          id
        }
        metadata {
          grepCodes
          visible
        }
        article {
          id
          title
          grepCodes
        }
      }
    }
  `,
  variables,
}, headers]);

const topicWithResource = async (variables, headers = {}) => getDataRes(sendRequest, [{
  query: `
    query topic($id: String!) {
      topic(id: $id) {
        id
        name
        contentUri
        path
        paths
        isPrimary
        parent
        subtopics {
          id
        }
        metadata {
          grepCodes
          visible
        }
        coreResources {
          id
          name
          contentUri
          path
          paths
          meta {
            id
            title
            introduction
            metaDescription
          }
          metadata {
            grepCodes
          }
          article {
            id
            revision
            title
            introduction
            created
            updated
            published
            visualElement
            tags
            grepCodes
            competenceGoals {
              id
              code
              title
              curriculum {
                id
                code
                title
              }
              competenceGoalSet {
                id
                code
                title
              }
              crossSubjectTopics {
                reference {
                  id
                  code
                  title
                }
                explanation
              }
              coreElements {
                reference {
                  id
                  code
                  title
                }
                explanation
              }
            }
          }
        }
      }
    }
  `,
  variables,
}, headers]);

const competenceGoals = async (variables, headers = {}) => getDataRes(sendRequest, [{
  query: `
    query competenceGoals($codes: [String!]) {
      competenceGoals(codes: $codes) {
        id
        code
        title
        curriculum {
          id
          code
          title
        }
        competenceGoalSet {
          title
          id
          code
        }
        crossSubjectTopics {
          reference {
            id
            code
            title
          }
          explanation
        }
        coreElements {
          reference {
            id
            code
            title
          }
          explanation
        }
      }
    }
  `,
  variables,
}, headers]);

const article = async (variables, headers = {}) => getDataRes(sendRequest, [{
  query: `
      query article($id: String!) {
        article(id: $id) {
          id
          revision
          title
          introduction
          # content
          created
          updated
          published
          visualElement
          # metaImage {
          #   url
          #   alt
          # }
          metaDescription
          articleType
          oldNdlaUrl
          # requiredLibraries {
          #   name
          #   url
          #   mediaType
          # }
          supportedLanguages
          # copyright {
          #   license {
          #     license
          #     url
          #     description
          #   }
          #   creators {
          #     type
          #     name
          #   }
          #   processors {
          #     type
          #     name
          #   }
          #   rightsholders {
          #     type
          #     name
          #   }
          #   origin
          # }
          tags
          competenceGoals {
            id
            code
            title
            curriculum {
              id
              code
              title
            }
            competenceGoalSet {
              id
              code
              title
            }
            crossSubjectTopics {
              reference {
                id
                code
                title
              }
              explanation
            }
            coreElements {
              reference {
                id
                code
                title
              }
              explanation
            }
          }
        }
      }
    `,
  variables,
}, headers]);

const resource = async (variables, headers = {}) => getDataRes(sendRequest, [{
  query: `
    query resource($id: String!) {
      resource(id: $id) {
        id
        name
        contentUri
        path
        paths
        meta {
          id
          title
          introduction
        }
        article {
          id
          revision
          title
          introduction
          # content
          created
          updated
          published
          visualElement
          # metaImage {
          #   url
          #   alt
          # }
          metaDescription
          articleType
          oldNdlaUrl
          # requiredLibraries {
          #   name
          #   url
          #   mediaType
          # }
          supportedLanguages
          # copyright {
          #   license {
          #     license
          #     url
          #     description
          #   }
          #   creators {
          #     type
          #     name
          #   }
          #   processors {
          #     type
          #     name
          #   }
          #   rightsholders {
          #     type
          #     name
          #   }
          #   origin
          # }
          tags
          competenceGoals {
            id
            code
            title
            curriculum {
              id
              code
              title
            }
            competenceGoalSet {
              id
              code
              title
            }
            crossSubjectTopics {
              reference {
                id
                code
                title
              }
              explanation
            }
            coreElements {
              reference {
                id
                code
                title
              }
              explanation
            }
          }
        }
      }
    }
    `,
  variables,
}, headers]);

module.exports = {
  subjects,
  topic,
  article,
  competenceGoals,
  topicWithResource,
  resource,
};
