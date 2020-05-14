import React from 'react';
import PropTypes from 'prop-types';

import s from './coreElement.module.scss';

const CoreElementItem = ({ name }) => (
  <article className={s.coreElement}>
    <header className={s.header}>
      <h1 className={s.name}>{name}</h1>
      <button type="button">Åpne</button>
    </header>
  </article>
);

CoreElementItem.propTypes = {
  name: PropTypes.string,
};

export default CoreElementItem;
