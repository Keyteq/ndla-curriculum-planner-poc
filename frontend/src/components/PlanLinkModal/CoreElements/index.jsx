import React from 'react';
import PropTypes from 'prop-types';

const CoreElements = ({ elements }) => (
  <section>
    <h1>Kjerneelement</h1>

    {Array.isArray(elements) && elements.map((element) => (
      <article key={element.id}>
        <header>
          <h1>{element.name}</h1>
          <button type="button">Åpne</button>
        </header>
      </article>
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
