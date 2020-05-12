import handleSubmit from './handleSubmit';

const handleDrop = async (e, setFile, setSubmitError, setSubmitting, setSubmitSuccess) => {
  e.preventDefault();
  e.stopPropagation();
  const [file] = [...e.dataTransfer.files];
  if (file.type !== 'application/json') {
    setSubmitError('Vennligst last opp en JSON-fil');
    return;
  }

  setFile(file);
  await handleSubmit(file, setSubmitting, setSubmitSuccess, setSubmitError);
};

export default handleDrop;
