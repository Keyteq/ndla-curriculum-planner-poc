/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
const { getCompetenceGoals, getCoreElements } = require('../udir/json-parser');

/**
 * Get a list of NDLA resources, from a UDIR JSON payload.
 * @param {Object} udirPayload - UDIR JSON payload
 * @param {Object} models - Mongo models
 */
async function buildIdList(udirPayload, models) {
  const compGoals = getCompetenceGoals(udirPayload);
  const coreEl = getCoreElements(udirPayload);
  const udirCodes = [...compGoals, ...coreEl];
  const articles = await models.Article.find({ grepCodes: { $in: udirCodes } });

  // TODO: This can be done with better Mongo query.
  // TODO: OPTIMIZE
  return Promise.all(articles
    .map(async (articleData) => {
      const subjects = await models.Subject.find({ _id: articleData.subject_ids });
      return {
        // topicId: topics.map(({ _id }) => _id),
        articleId: articleData._id,
        ndlaArticleId: articleData.ndla_id,
        subjectIds: subjects.map(({ _id }) => _id),
        ndlaSubjectIds: subjects.map(({ ndla_id }) => ndla_id),
        ndlaTopicIds: subjects.map(({ topic_ndla_ids }) => topic_ndla_ids).flat(),
        grepCodes: articleData.grepCodes,
      };
    }));
}

/**
 * Get a list of NDLA Articles, from a UDIR JSON payload.
 * @param {Object} udirPayload - UDIR JSON payload
 * @param {Object} models - Mongo models
 */
function getArticlesFromUdir(udirPayload, models) {
  const compGoals = getCompetenceGoals(udirPayload);
  const coreEl = getCoreElements(udirPayload);
  const udirCodes = [...compGoals, ...coreEl];
  return models.Article.find({ grepCodes: { $in: udirCodes } });
}

/**
 * Get a list of NDLA Articles, from a UDIR JSON payload.
 * @param {Object} udirPayload - UDIR JSON payload
 * @param {Object} models - Mongo models
 */
async function getArticleIdsAndUdirIdsFromUdir(udirPayload, models) {
  const compGoals = getCompetenceGoals(udirPayload);
  const coreEl = getCoreElements(udirPayload);
  const udirCodes = [...compGoals, ...coreEl];
  const articles = await models.Article.find({ grepCodes: { $in: udirCodes } });
  return articles.map(({ ndla_id: ndlaId, grepCodes }) => ({ ndlaId, grepCodes }));
}

module.exports = {
  buildIdList,
  getArticlesFromUdir,
  getArticleIdsAndUdirIdsFromUdir,
};
