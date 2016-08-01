class Endpoint {

  constructor(handle, method, path = '') {
    this.handle = handle;
    this.method = method;
    this.path = path;
  }
}


export default Endpoint;
