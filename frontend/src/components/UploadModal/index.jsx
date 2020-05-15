import React from 'react';
import PropTypes from 'prop-types';

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
  const [planId, setPlanId] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [submitErr, setSubmitErr] = React.useState(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [inDropZone, setInDropZone] = React.useState(false);
  const [href, setHref] = React.useState('');

  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (process.browser) {
      setHref(window.location.href);
    }
  }, []);

  const openFileDialog = () => {
    if (inputRef) {
      inputRef.current.click();
    }
  };

  const toggleModal = (mounted = false) => {
    setShowModal(mounted);

    // reset state
    setFile(null);
    setPlanId('');
    setSubmitting(false);
    setSubmitErr(null);
    setSubmitSuccess(false);
    setInDropZone(false);
  };

  const submit = async (f) => {
    setSubmitting(true);

    try {
      const id = await handleSubmit(f);

      setSubmitting(false);
      setSubmitSuccess(true);
      setSubmitErr(null);

      return id;
    } catch (err) {
      console.log(err);

      setSubmitting(false);
      setSubmitSuccess(false);
      setSubmitErr(err.message);

      return null;
    }
  };

  const change = async (e) => {
    if (!e.target.files[0]) {
      setSubmitErr('Kunne ikke laste opp filen');
    }

    setFile(e.target.files[0]);
    const id = await submit(e.target.files[0]);
    setPlanId(id);
  };

  const drop = async (e) => {
    try {
      const f = handleDrop(e);
      const id = await submit(f);
      setPlanId(id);
    } catch (err) {
      setSubmitErr(err.message);
    }
  };

  return (
    <>
      {showModal && (
        <Modal title={submitSuccess ? 'Fil mottatt' : 'Last opp planleggingsfil'} setMounted={toggleModal}>
          <div
            className={[s.dropZone, inDropZone && s.dropZoneActive].filter(Boolean).join(' ')}
            onDrop={drop}
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

            {!submitting && submitSuccess && !!file && (
              <SubmitSuccess fileName={file.name} baseUrl={href} planId={planId} />
            )}
          </div>
        </Modal>
      )}
    </>
  );
};

FileUploadForm.propTypes = {
  showModal: PropTypes.bool,
  setShowModal: PropTypes.func,
};

export default FileUploadForm;
