class Response {

  constructor(koaContext) {
    this.ctx = koaContext;
  }

  write(body) {
    this.ctx.body = body;
    return this;
  }

  getHeader(field) {
    return this.ctx.response.get(field);
  }

  setHeader(field, value) {
    this.ctx.response.set(field, value);
    return this;
  }
}


export default Response;
