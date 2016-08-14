import http from 'http';
import pg from 'polygoat';
import Koa from 'koa';
import KoaRouter from 'koa-router';

import Config from '../config';
import { Component, Inject, OnStart, OnStop } from '../container';
import DispatcherFactory from '../dispatcher';

import Request from './request';
import Response from './response';
import Router from './router';


function listen(server, port, host, callback) {
  return pg((done) => {
    server.listen({
      port,
      host,
    }, done);
  }, callback);
}

/* eslint no-param-reassign:0 no-nested-ternary:0 */
function createHttpRoute(resource, dispatcherFactory) {
  const route = {};
  route.method = resource.method.toLowerCase();
  route.path = resource.path;
  route.fn = async (ctx) => {
    const dispatcher = dispatcherFactory.create();
    const response = new Response();
    const request = new Request(ctx);

    await resource.handler(dispatcher, request, response);

    ctx.body = response.body;
    ctx.status = response.httpStatus ? response.httpStatus : (response.body ? 200 : 204);
    Object.keys(response.httpHeaders).forEach((h) => ctx.set(h, response.httpHeaders[h]));
  };
  return route;
}

function createHttpRouter() {
  const dispatcherFactory = new DispatcherFactory();
  const koaRouter = new KoaRouter();
  this.router.resources.forEach((resource) => {
    const route = createHttpRoute(resource, dispatcherFactory);
    koaRouter[route.method](route.path, route.fn);
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

  @Inject() router: Router;
  @Inject() config: Config;

  httpServer;


  @OnStart()
  async start() {
    const httpRouter = this::createHttpRouter();
    const httpPort = this.config.get('http.port');
    const httpHost = this.config.get('http.host');
    this.httpServer = this::createHttpServer(httpRouter);
    await listen(this.httpServer, httpPort, httpHost);
  }

  @OnStop()
  async stop() {
    if (this.httpServer) {
      this.httpServer.close();
    }
  }
}


export default Server;
