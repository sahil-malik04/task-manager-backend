exports.successResponse = (code, message, data = null) => ({
  status: code,
  message,
  ...(data && { data }),
});

exports.failResponse = (code, message) => ({
  status: code,
  message,
});
