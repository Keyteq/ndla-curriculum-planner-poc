module.exports = async function plan(request, response) {
  const { file, ndla } = request;
  if (!file || !file.originalname || !file.encoding || !file.mimetype || !file.buffer) {
    return response.status(400).json({
      payload: {
        message: 'Invalid payload',
      },
      responseTime: new Date().toISOString(),
      requestId: ndla.invocationId,
    });
  }
  try {
    const createFile = await ndla.models.UdirPlan.create(file);
    return response.status(200).json({
      payload: {
        planId: createFile._id,
      },
      responseTime: new Date().toISOString(),
      requestId: ndla.invocationId,
    });
  } catch (error) {
    return response.status(500);
  }
};
