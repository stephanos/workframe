import http from 'http';
import Koa from 'koa';
import KoaRouter from 'koa-router';

import Config from '../config';
import Router from './router';
import { Component, Inject } from '../container';


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


@Component()
class Server {

  @Inject(Router)
  router;

  @Inject(Config)
  config;


  async start() {
    const httpRouter = this::createHttpRouter();
    this.httpServer = this::createHttpServer(httpRouter);
    this.httpServer.listen(this.config.get('http.port'));
  }

  async stop() {
    this.httpServer.close();
  }
}


export default Server;
