import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../Portal';
import Backdrop from './Backdrop';

import s from './modal.module.scss';

const Modal = ({ setMounted, title, children }) => {
  const escKeyListener = React.useCallback((e) => {
    if (e.keyCode !== 27) return;
    setMounted(false);
  }, [setMounted]);

  const modalRef = React.useRef(null);

  React.useEffect(() => {
    if (modalRef?.current) {
      modalRef.current.focus();
    }

    window.addEventListener('keyup', escKeyListener);
    document.body.dataset.scrollLock = true;

    return () => {
      window.removeEventListener('keyup', escKeyListener);
      document.body.dataset.scrollLock = false;
    };
  }, [modalRef]);

  return (
    <Portal>
      <Backdrop onClick={() => setMounted(false)} />

      <div className={s.modal} ref={modalRef}>
        <div className={s.modalHeader}>
          {title && <p className={s.modalTitle}><b>{title}</b></p>}

          <div className={s.closeButtonContainer}>
            <button type="button" className={s.closeButton} onClick={() => setMounted(false)}>Lukk</button>
          </div>
        </div>

        {children}
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  setMounted: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Modal;
