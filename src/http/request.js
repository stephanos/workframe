class Request {

  constructor(koaContext) {
    this.ctx = koaContext;
  }


  accepts(...types) {
    return this.ctx.request.accepts(...types);
  }

  is(...types) {
    return this.ctx.request.is(...types);
  }


  get raw() {
    return this.ctx.req;
  }

  get body() {
    return this.ctx.request.body;
  }

  get url() {
    return this.ctx.request.url;
  }

  get urlParams() {
    return this.ctx.params;
  }

  get path() {
    return this.ctx.request.path;
  }

  get length() {
    return this.ctx.request.length;
  }

  get protocol() {
    return this.ctx.request.protocol;
  }

  get secure() {
    return this.ctx.request.secure;
  }

  get ip() {
    return this.ctx.request.ip;
  }

  get method() {
    return this.ctx.request.method;
  }

  get ips() {
    return this.ctx.request.ips;
  }

  get host() {
    return this.ctx.request.host;
  }

  get subdomains() {
    return this.ctx.request.subdomains;
  }

  get query() {
    return this.ctx.request.query;
  }

  get querystring() {
    return this.ctx.request.querystring;
  }

  get type() {
    return this.ctx.request.type;
  }

  get headers() {
    return this.ctx.request.header;
  }

  get encoding() {
    return this.headers['content-encoding'];
  }
}


export default Request;
