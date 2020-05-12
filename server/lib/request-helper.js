const axios = require('axios');

const ndlaBase = 'https://api.ff.ndla.no/graphql-api/graphql';

const sendRequest = async (data, headers = {}) => axios({
  method: 'post',
  url: ndlaBase,
  data,
  headers,
});

const getDataRes = async (fn, props) => {
  const { data } = await fn(...props);
  return data;
};

module.exports = {
  getDataRes,
  sendRequest,
};
