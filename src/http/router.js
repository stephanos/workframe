import { ApplicationContext } from '../app';
import { Component, Inject, OnStart } from '../container';

import Resource from './resource';
import { Resource as ResourceDecorator } from './decorators';


@Component()
class Router {

  resources = [];

  @Inject(ApplicationContext)
  appContext;

  @OnStart()
  async start() {
    const urlRouterComponent = this.appContext.components.find((c) => c.factory.name === 'UrlRouter');
    if (!urlRouterComponent) {
      throw new Error('unable to find "UrlRouter"');
    }

    const urlRouter = this.appContext.createComponent(urlRouterComponent);
    if (!urlRouter) {
      throw new Error('unable to create "UrlRouter"');
    }

    const routes = urlRouter.routes();

    const createResources = (url, controllerRef) => {
      const controllerComp = this.appContext.components.find((c) => c.factory === controllerRef);
      const controller = this.appContext.createComponent(controllerComp);
      controllerComp.decorations
        .filter((dec) => dec.type === ResourceDecorator)
        .forEach((resourceDec) => {
          const httpMethod = resourceDec.parameters[0];
          const httpPath = url + resourceDec.parameters[1];
          const handler = async (request, response) => {
            const method = resourceDec.target.name;
            const dispatcher = undefined; // TODO!
            controller[method](dispatcher, request, response);
          };
          const resource = new Resource(handler, httpMethod, httpPath);
          this.resources.push(resource);
        });
    };

    const collect = (routeTree, url = '') => {
      Object.keys(routeTree).forEach((key) => {
        const val = routeTree[key];

        if (!key.startsWith('/')) {
          throw new Error(`invalid URL route '${key}': must start with an '/'`);
        }

        const fullUrl = key === '/' ? url : url + key;
        if (val.name) {
          createResources(fullUrl, val);
        } else {
          collect(val, fullUrl);
        }
      });
    };

    collect(routes);
  }
}


export default Router;
