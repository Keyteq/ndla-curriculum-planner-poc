import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import s from './submitSuccess.module.scss';

const loosenUrl = (url) => (url.charAt(url.length - 1) === '/' ? url.slice(0, url.length - 1) : url);
const makeUrlLabel = (url) => {
  const regex = /^https?:\/\/(.*)/;
  if (!url.match(regex)) return url;
  return regex.exec(url)[1];
};

const SubmitSuccess = ({ fileName, baseUrl, planId }) => (
  <div className={s.wrapper}>
    <img src="" alt="" />
    <p className={s.text}>
      Læringsressurser til
      {' '}
      <b>{fileName}</b>
      {' '}
      er klar og ligger på
      {' '}
      <Link href={`/${planId}`}>
        <a>{`${makeUrlLabel(loosenUrl(baseUrl))}/${planId}`}</a>
      </Link>
    </p>

    <div className={s.buttonContainer}>
      <Link href={`/${planId}`}>
        <a className={s.primaryButton}>Gå til ressursene</a>
      </Link>

      <button type="button" className={s.secondaryButton}>
        Kopier lenken til ressursene
      </button>
    </div>
  </div>
);

SubmitSuccess.propTypes = {
  fileName: PropTypes.string,
  baseUrl: PropTypes.string,
  planId: PropTypes.string,
};

export default SubmitSuccess;
