import React from 'react';
import PropTypes from 'prop-types';

const Benchmarks = ({ benchmarks }) => (
  <section>
    <h1>Kompetansemål</h1>

    <ul>
      {Array.isArray(benchmarks) && benchmarks.map((bm) => (
        <li key={bm.id}>
          <div>
            <p><b>utføre arbeidsoppgaver inner produksjon og høsting eller fangst</b></p>
          </div>
          <div>
            <a href="/">Søk på alle ressurser som passer til dette kompetansemålet</a>
          </div>
        </li>
      ))}
    </ul>
  </section>
);

Benchmarks.propTypes = {
  benchmarks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
  })),
};

export default Benchmarks;
