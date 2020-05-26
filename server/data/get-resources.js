const fs = require('fs');
const path = require('path');
const { mongooseConnect, models } = require('../model');
const api = require('../lib/ndla/api');


function writeFile(filePath, data) {
  return fs.writeFile(filePath, data, (err) => {
    if (err) return console.log(err);
    return console.log(`File at: ${filePath}`);
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

async function getTopicIds(model) {
  const idsRes = await model.find({}, { ndla_id: 1 });
  return idsRes.map(({ ndla_id: ndlaId }) => ndlaId.toString());
}

function getTopicsData(ids) {
  return Promise.all(ids.map((id) => api.topicWithResource({ id })));
}

function insertResources(data) {
  return Promise.all(data.map(async (item) => {
    console.log('Parsing topic');
    const ndalTopicId = item.id;
    if (!item.coreResources) {
      return {};
    }
    return Promise.all(item.coreResources.map(async (resource) => {
      console.log('Parsing resource');
      let article;
      const temp = { ...resource };
      temp.ndla_id = temp.id;
      delete temp.id;
      if (temp.meta) {
        temp.metaId = resource.meta.id;
        temp.metaTitle = resource.meta.title;
        temp.metaIntroduction = resource.meta.introduction;
        temp.metaDescription = resource.meta.metaDescription;
        delete temp.meta;
      }
      if (temp.article && temp.article.id) {
        temp.ndla_article_ids = [temp.article.id];
        article = temp.article;
        delete temp.article;
      }
      temp.ndla_topic_ids = [ndalTopicId];
      const resourceDataRes = await models.Resource
        .findOneAndUpdate({ ndla_id: temp.ndla_id }, temp, {
          upsert: true,
        });
      if (article) {
        console.log('Parsing article');
        article.ndla_id = article.id;
        article.ndla_topic_ids = [ndalTopicId];
        article.ndla_resource_ids = [temp.ndla_id];
        // article.resource_ids = [resourceDataRes._id];
        await models.Article.findOneAndUpdate({ ndla_id: article.ndla_id }, article, {
          upsert: true,
        });
      }
    }));
  }));
}

async function run() {
  await connectToMongo();
  const ids = await getTopicIds(models.Topic);
  const ndlaGqlRes = await Promise.all((await getTopicsData(ids)).map(async (res) => {
    if (res && res.data && res.data.topic) {
      await writeFile(`${__dirname}/temp/topic/${res.data.topic.id}.json`, JSON.stringify(res.data.topic, null, 2));
      return res.data.topic;
    }
    return {};
  }));
  await insertResources(ndlaGqlRes);
}

run();
