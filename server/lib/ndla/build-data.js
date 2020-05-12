const fs = require('fs');
const path = require('path');

const { mongooseConnect, models } = require('../../model');
const api = require('./api');
const parser = require('./parser');

function writeFile(filePath, data) {
  return fs.writeFile(filePath, data, (err) => {
    if (err) return console.log(err);
    return console.log('File at: filePath');
  });
}

let mongoConn;

async function connectToMongo() {
  if (mongoConn) {
    return mongoConn;
  }
  mongoConn = await mongooseConnect(process.env.MONGO_URI);
  return mongoConn;
}

async function createSubjects() {
  await connectToMongo();
  const rawSubject = await api.subjects({}, {});
  const subjects = parser.subject(rawSubject);
  return Promise.all(subjects
    .map(async (item) => models.Subject.findOneAndUpdate({ ndla_id: item.ndla_id }, item, {
      upsert: true,
    })));
}

async function createTopics() {
  await connectToMongo();
  const subjects = await models.Subject.find();
  // TODO: do this with the mongo query;
  // eslint-disable-next-line camelcase
  const ids = subjects.filter(({ topic_ndla_ids }) => (
    // eslint-disable-next-line camelcase
    topic_ndla_ids
    && Array.isArray(topic_ndla_ids)
    && topic_ndla_ids.length > 0))
    // eslint-disable-next-line camelcase
    .map(({ ndla_id, topic_ndla_ids }) => ({ ndla_id, topic_ndla_ids }));

  const rawTopicRes = await ids.reduce(async (res, idSet) => {
    const subjectId = idSet.ndla_id;
    console.log(`Getting Topics: ${subjectId}`);
    const result = await Promise.all(await res);
    const topicIds = idSet.topic_ndla_ids;
    const rawTopics = await Promise.all(topicIds.map((topicId) => api.topic({
      id: topicId,
    }, {})));

    result.push(...rawTopics);
    return result;
  }, Promise.resolve([]));

  const dirPath = path.resolve(__dirname, '../../../DEV/NDLA_DATA');
  const fileNameRaw = '/raw-topics.json';
  const filePathRaw = dirPath.toString() + fileNameRaw;
  writeFile(filePathRaw, JSON.stringify(rawTopicRes, null, 2));

  const topics = parser.topic(rawTopicRes);
  const articles = parser.articleFromTopic(rawTopicRes);

  const fileName = '/topics.json';
  const filePath = dirPath.toString() + fileName;
  writeFile(filePath, JSON.stringify(topics, null, 2));

  const articleFileName = '/topics.json';
  const articleFilePath = dirPath.toString() + articleFileName;
  writeFile(articleFilePath, JSON.stringify(articles, null, 2));

  const insertTopicsRes = await Promise.all(topics
    .map(async (item) => models.Topic.findOneAndUpdate({ ndla_id: item.ndla_id }, item, {
      upsert: true,
    })));
  const insertArticlesRes = await Promise.all(articles
    .map(async (item) => models.Article.findOneAndUpdate({ ndla_id: item.ndla_id }, item, {
      upsert: true,
    })));
  return {
    insertTopicsRes,
    insertArticlesRes,
  };
}

module.exports = {
  createSubjects,
  createTopics,
};
