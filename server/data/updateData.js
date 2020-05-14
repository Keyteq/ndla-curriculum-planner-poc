const { mongooseConnect, models } = require('../model');

function getData(model) {
  return model.find();
}

function getChildren(data, subModel, softLinkKey) {
  return Promise.all(data.map(async (item) => {
    const res = item.toObject();
    const softKey = item[softLinkKey] || [];
    res.tempIds = [];
    if (softKey && softKey.length > 0) {
      res.tempIds = await subModel.find({ ndla_id: { $in: softKey } });
    }
    return res;
  }));
}

function forEachParentUpdateChild(data) {
  return data.map(async (item) => {
    // eslint-disable-next-line no-underscore-dangle
    const subjectId = item._id;
    const res = { ...item };
    res.topicIds = await Promise.all(res.topicIds
      // eslint-disable-next-line no-underscore-dangle
      .map(async (topicItem) => models.Topic.findOneAndUpdate({ _id: topicItem._id }, {
        $push: { subject_ids: subjectId },
      })));
  });
}

function forEachParentUpdateChildTopic(data) {
  return data.map(async (item) => {
    // eslint-disable-next-line no-underscore-dangle
    const topicId = item._id;
    const subjectIds = item.subject_ids;
    const res = { ...item };
    res.articleIds = await Promise.all(res.articleIds
      // eslint-disable-next-line no-underscore-dangle
      .map(async (articleItem) => models.Article.findOneAndUpdate({ _id: articleItem._id }, {
        $push: { topic_ids: topicId, subject_ids: subjectIds },
      })));
    return res;
  });
}


async function run() {
  await mongooseConnect(process.env.MONGO_URI);
  // const data = await getData(models.Subject);
  // const withChildren = await getChildren(data, models.Topic, 'topic_ndla_ids');
  // const updateTopics = await forEachParentUpdateChildSubject(withChildren);
  const data = await getData(models.Topic);
  const withChildren = await getChildren(data, models.Article, 'article_ndla_ids');
  const updateTopics = await forEachParentUpdateChildTopic(withChildren);
}

run();
