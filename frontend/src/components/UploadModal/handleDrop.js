// import handleSubmit from './handleSubmit';

const handleDrop = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const [file] = [...e.dataTransfer.files];
  if (file.type !== 'application/json') throw new Error('Vennligst last opp en JSON-fil');

  return file;
};

export default handleDrop;
