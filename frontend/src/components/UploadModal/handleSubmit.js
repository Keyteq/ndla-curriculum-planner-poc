import getGlobals from '../../utils/getGlobals';

const submit = async (file) => {
  const formData = new FormData();
  formData.append('plan', file);

  const res = await fetch(`${getGlobals('API_URL')}/api/v1/upload/plan`, {
    method: 'POST',
    mode: 'cors',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Kunne ikke laste opp læreplanen. Prøv igjen senere.');
  }

  const { payload } = await res.json();

  return payload?.planId;
};

export default submit;
