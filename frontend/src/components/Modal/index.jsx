import React from 'react';
import PropTypes from 'prop-types';

import Backdrop from './Backdrop';

import s from './modal.module.scss';

const Modal = ({ children, onBackdropClick }) => (
  <>
    <Backdrop onClick={onBackdropClick} />

    <div className={s.modal}>
      {children}
    </div>
  </>
);

Modal.propTypes = {
  children: PropTypes.node,
  onBackdropClick: PropTypes.func,
};

export default Modal;
