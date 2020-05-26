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
        if (item.ndlaResourceIds && item.ndlaResourceIds[0]) {
          const { data: { competenceGoals } } = await api
            .competenceGoals({ codes: item.grepCodes });
          const { data: { resource: ndlaResourceData } } = await api
            .resource({ id: item.ndlaResourceIds[0] });
          return {
            ...ndlaResourceData,
            competenceGoals,
          };
        }
        return null;
      }));
      return {
        id,
        list: list.filter((item) => !!item),
      };
    },
  },
};
