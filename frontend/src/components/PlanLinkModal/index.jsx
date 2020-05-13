import React from 'react';
import PropTypes from 'prop-types';

import Portal from '../Portal';
import Modal from '../Modal';
import ResourceItem from '../ResourceItem';
import CoreElements from './CoreElements';
import Benchmarks from './Benchmarks';

const PlanLinkModal = ({ resourceItem }) => (
  <Portal>
    <Modal>
      <ResourceItem title={resourceItem.label} />
      <Benchmarks benchmarks={resourceItem.benchmarks} />
      <CoreElements elements={resourceItem.coreElements} />
    </Modal>
  </Portal>
);

PlanLinkModal.propTypes = {
  resourceItem: PropTypes.shape({
    label: PropTypes.string,
    benchmarks: PropTypes.arrayOf(PropTypes.object),
    coreElements: PropTypes.arrayOf(PropTypes.object),
  }),
};

export default PlanLinkModal;
