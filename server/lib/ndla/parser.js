function subject(data) {
  const { subjects } = data.data;
  return subjects.map((item) => {
    const sub = { ...item };
    sub.ndla_id = sub.id;
    delete sub.id;
    if (sub.metadata && sub.metadata.grepCodes) {
      sub.grepCodes = sub.metadata.grepCodes;
    }
    if (sub.topics && Array.isArray(sub.topics) && sub.topics.length > 0) {
      sub.topic_ndla_ids = sub.topics.map(({ id }) => id);
    }
    delete sub.topics;
    return sub;
  });
}

function topic(data) {
  const topics = data.map((item) => item.data.topic);
  return topics.map((item) => {
    const topi = { ...item };
    topi.ndla_id = topi.id;
    if (topi.metadata && topi.metadata.grepCodes) {
      topi.grepCodes = topi.metadata.grepCodes;
    }
    if (topi.subtopics && Array.isArray(topi.subtopics) && topi.subtopics.length > 0) {
      topi.sub_topic_ndla_ids = topi.subtopics.map(({ id }) => id);
    }
    if (topi.article && topi.article.id) {
      topi.article_ndla_ids = [topi.article.id];
    }
    delete topi.metadata;
    delete topi.subtopics;
    delete topi.article;
    return topi;
  });
}

function articleFromTopic(data) {
  const topics = data.map((item) => item.data.topic);
  return topics.map((item) => {
    if (!item.article || !item.article.id) {
      return {};
    }
    const arti = { ...item.article };
    arti.ndla_id = arti.id;
    delete arti.id;
    return arti;
  });
}

module.exports = {
  subject,
  topic,
  articleFromTopic,
};
