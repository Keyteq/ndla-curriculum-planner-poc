import React from 'react';
import PropTypes from 'prop-types';

import CoreElementItem from './CoreElementItem';

import s from './coreElements.module.scss';

const CoreElements = ({ elements }) => (
  <section className={s.coreElements}>
    <h1 className={s.title}>Kjerneelement</h1>

    {Array.isArray(elements) && elements.map((element) => (
      <CoreElementItem key={element.id} name={element.name} />
    ))}
  </section>
);

CoreElements.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
};

export default CoreElements;
