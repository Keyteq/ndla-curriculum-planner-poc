import React from 'react';

import UploadTrigger from '../components/UploadTrigger';
import UploadModal from '../components/UploadModal';

const Home = () => {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <main>
      <h1>Hello</h1>
      <UploadTrigger setShowModal={setShowModal} />
      <UploadModal showModal={showModal} setShowModal={setShowModal} />
    </main>
  );
};

export default Home;
