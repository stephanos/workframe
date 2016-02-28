/* eslint no-param-reassign:0 */

import Koa from 'koa';
import http from 'http';
import Router from 'koa-router';

class ControllerComponentType {

  static typeName = 'Controller';
  static injectTypeWhitelist = ['Accessor', 'Processor'];

  static verify() {}

  static beforeInitialize(context) {
    context.httpRouter = new Router();
  }

  static initialize(context, component) {
    const basePath = component.opts[1];
    const proto = component.factory.prototype;
    Object.getOwnPropertyNames(proto).forEach(key => {
      const path = proto[key].path;
      const method = proto[key].method;
      if (path && method) {
        const fullPath = basePath + path;
        context.httpRouter[method.toLowerCase()](fullPath, (ctx, next) => {
          context.router.invoke(component, key, [ctx.request, ctx.response, next]);
        });
      }
    });
  }

  static afterInitialize(context) {
    const koa = new Koa();
    koa.use(context.httpRouter.routes());
    koa.use(context.httpRouter.allowedMethods());

    context.httpServer = http.createServer(koa.callback());
    context.httpServer.listen(9000);
  }

  static terminate(context) {
    context.httpServer.close();
  }
}

export default ControllerComponentType;