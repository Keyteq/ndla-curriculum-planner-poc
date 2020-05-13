import React from 'react';
import PropTypes from 'prop-types';

const CoreElementItem = ({ id, name }) => (
  <article key={id}>
    <header>
      <h1>{name}</h1>
      <button type="button">Åpne</button>
    </header>
  </article>
);

CoreElementItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};

export default CoreElementItem;
