const submit = async (file, setSubmitting, setSubmitSuccess, setSubmitError) => {
  const formData = new FormData();
  formData.append('plan', file);

  setSubmitting(true);
  try {
    const res = await fetch('/api/plan', {
      method: 'POST',
      headers: {
        'content-type': 'multipart/form-data',
      },
      body: formData,
    });
    if (!res.ok) {
      throw new Error('Kunne ikke laste opp læreplanen. Prøv igjen senere.');
    }

    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
    }, 4219);
  } catch (err) {
    console.error(err);

    setSubmitError('Kunne ikke laste opp læreplanen. Prøv igjen senere.');
    setSubmitting(false);
    setSubmitSuccess(false);
  }
};

export default submit;
