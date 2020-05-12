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

const article = async (variables, headers = {}) => getDataRes(sendRequest, [{
  query: `
      query article($id: String!) {
        article(id: $id) {
          id
          title
          grepCodes
        }
      }
    `,
  variables,
}, headers]);

module.exports = {
  subjects,
  topic,
  article,
};
