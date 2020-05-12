import React from 'react';
import PropTypes from 'prop-types';

import s from './submit.module.scss';

const Submit = React.forwardRef(({ openFileDialog, handleChange }, inputRef) => (
  <div className={s.wrapper}>
    <img src="" alt="" />

    <p>Dra og slipp her</p>
    <p>
      eller
      {' '}
      <button type="button" className={s.uploadButton} onClick={openFileDialog}>last opp fra maskinen din</button>
    </p>

    <input className={s.hiddenInput} aria-hidden="true" type="file" accept="application/json" onChange={handleChange} ref={inputRef} />
  </div>
));

Submit.propTypes = {
  openFileDialog: PropTypes.func,
  handleChange: PropTypes.func,
};

export default Submit;
