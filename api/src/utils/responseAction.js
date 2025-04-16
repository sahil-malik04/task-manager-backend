module.exports = {
  successAction,
  failAction,
};

function successAction(data) {
  if (data?.data) {
    return {
      statusCode: data.status,
      message: data.message,
      data: data?.data,
    };
  }
  return {
    statusCode: data.status,
    message: data.message,
  };
}

function failAction(error) {
  return { statusCode: error?.status, message: error?.message };
}
