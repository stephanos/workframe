import http from 'http';

import Koa from 'koa';
import KoaRouter from 'koa-router';


function createHttpRouter() {
  const koaRouter = new KoaRouter();
  this.router.resources.forEach((resource) => {
    koaRouter[resource.method.toLowerCase()](resource.path, (ctx, next) => {
      resource.invoke(ctx.request, ctx.response, next);
    });
  });
  return koaRouter;
}

function createHttpServer(koaRouter) {
  const koa = new Koa();
  koa.use(koaRouter.routes());
  koa.use(koaRouter.allowedMethods());
  return http.createServer(koa.callback());
}


class Server {

  constructor(router) {
    this.router = router;
  }

  async start() {
    const httpRouter = this::createHttpRouter();
    this.httpServer = this::createHttpServer(httpRouter);
    this.httpServer.listen(9000);
  }

  async stop() {
    this.httpServer.close();
  }
}


export default Server;
