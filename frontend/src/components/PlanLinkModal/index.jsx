import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import ResourceItem from '../ResourceItem';
import CoreElements from './CoreElements';
import Benchmarks from './Benchmarks';

const PlanLinkModal = ({ resourceItem, setShowModal }) => (
  <Modal setMounted={setShowModal}>
    <ResourceItem resourceGroup={resourceItem.type} title={resourceItem.label} />

    {Array.isArray(resourceItem.benchmarks) && (
      <Benchmarks benchmarks={resourceItem.benchmarks} />
    )}

    {Array.isArray(resourceItem.coreElements) && (
      <CoreElements elements={resourceItem.coreElements} />
    )}
  </Modal>
);

PlanLinkModal.propTypes = {
  resourceItem: PropTypes.shape({
    label: PropTypes.string,
    type: PropTypes.string,
    benchmarks: PropTypes.arrayOf(PropTypes.object),
    coreElements: PropTypes.arrayOf(PropTypes.object),
  }),
  setShowModal: PropTypes.func,
};

export default PlanLinkModal;
