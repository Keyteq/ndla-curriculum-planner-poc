
module.exports = async function ping(request, response) {
  return response.status(200).json({
    payload: {
      message: 'pong',
    },
    response_time: new Date().toISOString(),
    request_id: request.ndla.invocationId,
  });
};
