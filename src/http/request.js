class Request {

  constructor(koaContext) {
    this.ctx = koaContext;
  }

  get url() {
    return this.ctx.request.url;
  }

  get urlParams() {
    return this.ctx.params;
  }

  get headers() {
    return this.ctx.request.header;
  }
}


export default Request;
