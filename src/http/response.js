class Response {

  httpStatus = null
  httpHeaders = {}


  set status(status) {
    this.httpStatus = status;
    return this;
  }

  throw(status, message) {
    const err = new Error(message);
    err.status = status;
    throw err;
  }

  setHeader(field, value) {
    this.httpHeaders[field] = value;
    return this;
  }
}


export default Response;
