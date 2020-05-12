import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  if (!process.browser) return null;

  const portalRoot = document.querySelector('div[data-portal-root]');
  if (!portalRoot) return null;

  return ReactDOM.createPortal(children, portalRoot);
};

export default Portal;
