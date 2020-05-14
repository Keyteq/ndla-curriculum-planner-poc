/* eslint-disable no-unused-vars */
const queryHelper = require('../lib/query');
const api = require('../lib/ndla/api');

module.exports = {
  Query: {
    plan: async (parent, { id }, ctx) => {
      const { ndla } = ctx;
      const rawUdirPlan = await ndla.models.UdirPlan.findOne({ _id: id });
      const file = JSON.parse(rawUdirPlan.buffer.toString('utf-8'));
      const articles = await queryHelper.getArticleIdsAndUdirIdsFromUdir(file, ndla.models);
      const list = await Promise.all(articles.map(async (item) => {
        const { data: { competenceGoals } } = await api.competenceGoals({ codes: item.grepCodes });
        const { data: { article: ndlaArticleData } } = await api.article({ id: item.ndlaId });
        return {
          ...ndlaArticleData,
          competenceGoals,
        };
      }));
      return {
        id,
        list,
      };
    },
  },
};
