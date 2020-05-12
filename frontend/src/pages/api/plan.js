import http from 'http';

const planUploadHandler = (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: http.STATUS_CODES[405],
    });
  }

  if (req.headers['content-type'].toLowerCase() !== 'multipart/form-data') {
    return res.status(400).json({
      error: http.STATUS_CODES[400],
    });
  }

  console.log(req.body);

  return res.json({
    success: true,
  });
};

export default planUploadHandler;
