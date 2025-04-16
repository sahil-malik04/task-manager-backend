exports.successResponse = (code, message, data) => {
    if (data) {
      return {
        status: code,
        data,
        message,
      };
    }
    return {
      status: code,
      message,
    };
  };
  
  exports.failResponse = (code, message) => {
    return {
      status: code,
      message,
    };
  };
  