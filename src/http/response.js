class Response {

  constructor(koaContext) {
    this.ctx = koaContext;
  }

  write(body) {
    this.ctx.body = body;
    return this;
  }
}


export default Response;
