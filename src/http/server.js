import http from 'http';
import Koa from 'koa';
import KoaRouter from 'koa-router';

import Config from '../config';
import { Component, Inject } from '../container';

import Request from './request';
import Response from './response';
import Router from './router';


function createHttpRouter() {
  const koaRouter = new KoaRouter();
  this.router.resources.forEach((resource) => {
    koaRouter[resource.method.toLowerCase()](resource.path, async (ctx) => {
      const response = new Response(ctx);
      const request = new Request(ctx);
      await resource.handler(request, response);
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
    const httpPort = this.config.get('http.port');
    const httpHost = this.config.get('http.host');
    this.httpServer = this::createHttpServer(httpRouter);
    this.httpServer.listen(httpPort, httpHost);
  }

  async stop() {
    this.httpServer.close();
  }
}


export default Server;
