import React from 'react';
import PropTypes from 'prop-types';

import s from './benchmarks.module.scss';

const Benchmarks = ({ benchmarks }) => (
  <section className={s.benchmarks}>
    <h1 className={s.title}>Kompetansemål</h1>

    <ul className={s.list}>
      {Array.isArray(benchmarks) && benchmarks.map((bm) => (
        <li key={bm.id} className={s.listItem}>
          <div>
            <p><b>{bm.text}</b></p>
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
