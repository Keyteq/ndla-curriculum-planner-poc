import React from 'react';
import PropTypes from 'prop-types';

import CoreElementItem from './CoreElementItem';

import s from './coreElements.module.scss';

const CoreElements = ({ elements }) => {
  const [showDescription, setShowDescription] = React.useState(elements.map(() => false));

  const toggleDescription = (index) => {
    setShowDescription(showDescription.map((v, i) => {
      if (index !== i) return false;
      return !v;
    }));
  };

  return (
    <section className={s.coreElements}>
      <h1 className={s.title}>Kjerneelement</h1>

      {Array.isArray(elements) && elements.map((element, i) => (
        <CoreElementItem
          key={element.id}
          name={element.name}
          description={element.description}
          toggleDescription={() => toggleDescription(i)}
          descriptionIsShowing={showDescription[i]}
        />
      ))}
    </section>
  );
};

CoreElements.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  })),
};

export default CoreElements;
