// eslint-disable-next-line no-underscore-dangle
const getGlobals = (key) => (process.browser ? window.__GLOBALS__[key] : process.env[key]);

export default getGlobals;
