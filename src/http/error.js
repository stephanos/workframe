class HttpError {

  constructor(status, message, params) {
    this.status = status;
    this.message = message;
    this.params = params;
  }

  withMessage(message) {
    this.message = message;
    return this;
  }

  withParams(params) {
    this.params = params;
    return this;
  }
}


export default HttpError;
