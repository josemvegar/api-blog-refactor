module.exports = (status, code, message, details = null) => {
    return {
      status,
      code,
      response: {
        status: "error",
        message,
        ...(details && { details })
      }
    };
  }