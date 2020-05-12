/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';

import s from './backdrop.module.scss';

const Backdrop = ({ onClick }) => <div className={s.backdrop} onClick={onClick} />;

Backdrop.propTypes = {
  onClick: PropTypes.func,
};

export default Backdrop;
