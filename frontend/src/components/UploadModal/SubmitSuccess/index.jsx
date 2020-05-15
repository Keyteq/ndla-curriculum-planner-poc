import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import s from './submitSuccess.module.scss';

const SubmitSuccess = ({ planId }) => (
  <div className={s.wrapper}>
    <img src="" alt="" />
    <p>Læreplanen din er på vei ut i skyen.</p>

    <div>
      <Link href={`/resources/${planId}`}>
        <a>Gå til ressursene</a>
      </Link>

      <button type="button">
        Kopier lenken til ressursene
      </button>
    </div>
  </div>
);

SubmitSuccess.propTypes = {
  planId: PropTypes.string,
};

export default SubmitSuccess;
