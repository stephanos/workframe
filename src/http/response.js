class Response {

  httpStatus = null
  httpHeaders = {}

  set status(status) {
    this.httpStatus = status;
    return this;
  }

  setHeader(field, value) {
    this.httpHeaders[field] = value;
    return this;
  }
}


export default Response;
