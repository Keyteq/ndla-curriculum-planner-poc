import React from 'react';
import PropTypes from 'prop-types';

import s from './submitting.module.scss';

const Submitting = ({ fileName }) => (
  <div className={s.wrapper}>
    <div className={s.content}>
      <img className={s.fileIcon} src="" alt="" />
      <div className={s.spinnerContainer}>
        <p className={s.fileName}>{fileName}</p>
        <div className={s.spinner} />
      </div>
    </div>
  </div>
);

Submitting.propTypes = {
  fileName: PropTypes.string,
};

export default Submitting;
