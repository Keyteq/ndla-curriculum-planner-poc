import React from 'react';
import PropTypes from 'prop-types';

import './globalStyles.scss';

const NDLAApp = ({ Component, pageProps }) => <Component {...pageProps} />;

NDLAApp.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default NDLAApp;
