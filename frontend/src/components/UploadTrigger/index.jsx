import React from 'react';
import PropTypes from 'prop-types';

import Container from '../Container';

import s from './uploadTrigger.module.scss';

const UploadTrigger = ({ setShowModal }) => (
  <Container>
    <div className={s.wrapper}>
      <h2 className={s.title}>
        Har du brukt planleggingsverktøyet til Utdanningsdirektoratet?
      </h2>
      <p className={s.text}>
        Last opp filen her så får du oversikt over
        {' '}
        alle læringsressursene som kan brukes til din plan
      </p>

      <button className={s.button} type="button" onClick={() => setShowModal(true)}>Last opp</button>
    </div>
  </Container>
);

UploadTrigger.propTypes = {
  setShowModal: PropTypes.func,
};

export default UploadTrigger;
