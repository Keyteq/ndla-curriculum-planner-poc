const { getCompetenceGoals, getCoreElements } = require('../udir/json-parser');

/**
 * Get articles by competenceGoals and/or coreElements
 * TODO: need to be smarter about this. wee need to have the same
 * list struct and order as the org UDIR payload.
 * We need to get the topic(s) and subject(s) too.
 * @param {Object} data - UDIR JSON payload.
 * @param {Object} models - Mongo models
 */
async function getArticlesByUdirPayload(data, models) {
  const compGoals = getCompetenceGoals(data);
  const coreEl = getCoreElements(data);
  return models.Article.find({ grepCodes: { $in: [...compGoals, ...coreEl] } });
}

module.exports = {
  getArticlesByUdirPayload,
};
