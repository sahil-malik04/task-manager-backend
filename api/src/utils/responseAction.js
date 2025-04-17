module.exports = {
  successAction,
  failAction,
};

function successAction({ status, message, data = null }) {
  const response = { statusCode: status, message };
  if (data) response.data = data;
  return response;
}

function failAction(error) {
  return { statusCode: error?.status, message: error?.message };
}
