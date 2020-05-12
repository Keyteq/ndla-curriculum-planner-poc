import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../Portal';
import Modal from '../Modal';

import Submit from './Submit';
import Submitting from './Submitting';
import SubmitError from './SubmitError';
import SubmitSuccess from './SubmitSuccess';

import handleDragEnter from './handleDragEnter';
import handleDragLeave from './handleDragLeave';
import handleDragOver from './handleDragOver';
import handleDrop from './handleDrop';
import handleSubmit from './handleSubmit';

import s from './uploadModal.module.scss';

const FileUploadForm = ({ showModal, setShowModal }) => {
  const [file, setFile] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitErr, setSubmitErr] = React.useState(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [inDropZone, setInDropZone] = React.useState(false);

  const inputRef = React.useRef(null);

  const unmountModal = React.useCallback(() => {
    setShowModal(false);
  }, []);

  const escKeyListener = React.useCallback((e) => {
    if (e.keyCode !== 27) return;
    unmountModal();
  }, []);

  React.useEffect(() => {
    window.addEventListener('keyup', escKeyListener);

    return () => window.removeEventListener('keyup', escKeyListener);
  }, []);

  React.useEffect(() => {
    if (submitSuccess) {
      setTimeout(() => {
        setShowModal(false);

        // reset state
        setFile(null);
        setSubmitting(false);
        setSubmitErr(false);
        setSubmitSuccess(false);
      }, 2000);
    }
  }, [submitSuccess]);

  const openFileDialog = () => {
    if (inputRef) {
      inputRef.current.click();
    }
  };

  const change = async (e) => {
    setFile(e.target.files[0]);
    await handleSubmit(e.target.files[0], setSubmitting, setSubmitSuccess, setSubmitErr);
  };

  return (
    <>
      {showModal && (
        <Portal>
          <Modal onBackdropClick={unmountModal}>
            <p><b>Last opp planleggingsfil</b></p>
            <div
              className={[s.dropZone, inDropZone && s.dropZoneActive].filter(Boolean).join(' ')}
              onDrop={(e) => handleDrop(e, setFile, setSubmitErr, setSubmitting, setSubmitSuccess)}
              onDragOver={(e) => handleDragOver(e, setInDropZone)}
              onDragEnter={handleDragEnter}
              onDragLeave={(e) => handleDragLeave(e, setInDropZone)}
            >
              {!submitting && !file && (
                <Submit openFileDialog={openFileDialog} handleChange={change} ref={inputRef} />
              )}

              {submitting && !!file && (
                <Submitting fileName={file.name} />
              )}

              {!submitting && submitErr && (
                <SubmitError />
              )}

              {!submitting && submitSuccess && (
                <SubmitSuccess />
              )}
            </div>
          </Modal>
        </Portal>
      )}
    </>
  );
};

FileUploadForm.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default FileUploadForm;
