import React from 'react';
import PropTypes from 'prop-types';

import s from './coreElement.module.scss';

const CoreElementItem = ({
  name, description, toggleDescription, descriptionIsShowing,
}) => (
  <article className={s.coreElement}>
    <header className={s.header}>
      <h1 className={s.name}>{name}</h1>
      <button type="button" className={s.toggleButton} onClick={toggleDescription}>{descriptionIsShowing ? 'Lukk' : 'Åpne'}</button>
    </header>

    {descriptionIsShowing && <p className={s.description}>{description}</p>}
  </article>
);

CoreElementItem.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  toggleDescription: PropTypes.func,
  descriptionIsShowing: PropTypes.bool,
};

export default CoreElementItem;
