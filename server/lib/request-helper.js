const axios = require('axios');

const ndlaBase = process.env.NDLA_API_FF;

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
