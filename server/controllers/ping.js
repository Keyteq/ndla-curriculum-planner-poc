
module.exports = async function ping(request, response) {
  return response.status(200).json({
    payload: {
      message: 'pong',
    },
    responseTime: new Date().toISOString(),
    requestId: request.ndla.invocationId,
  });
};
