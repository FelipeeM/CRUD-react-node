const STATUS_MESSAGE = {
  SUCESS: "success",
  FAIL: "fail",
  ERROR: "error",
}
const STATUS_CODE = {
  SUCESS: 200,
  FAIL: 404,
  ERROR: 500
}

const responseStatusController = (status, response) => {
  switch (status) {
    case STATUS_MESSAGE.SUCESS:
      return { statusCode: STATUS_CODE.SUCESS, response: response.data };
    case STATUS_MESSAGE.FAIL:
      return { statusCode: STATUS_CODE.FAIL, response: response };
    case STATUS_MESSAGE.ERROR:
    default:
      return { statusCode: STATUS_CODE.ERROR, response: response };
  }
}

const successMessage = (message, data) => {
  return {
    status: STATUS_MESSAGE.SUCESS,
    message,
    data
  };
}

const failMessage = (message, errorMessage, path) => {
  return {
    status: STATUS_MESSAGE.FAIL,
    message,
    errors: [
      {
        message: errorMessage,
        path,
      },
    ],
  };
};
const errorMessage = (message, cause) => {
  return {
    status: STATUS_MESSAGE.ERROR,
    message,
    cause,
  };;
};

module.exports = { errorMessage, failMessage, successMessage, responseStatusController };