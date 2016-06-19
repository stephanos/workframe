import util from 'util';

import { ApplicationContext } from '../app';
import { Component, Inject, OnStart } from '../container';

import Resource from './resource';
import ResourceFactory from './resourceFactory';

const FILTER_KEY = 'filters';


@Component()
class Router {

  resources: Array<Resource> = [];

  @Inject(ApplicationContext)
  appContext;

  @Inject(ResourceFactory)
  resourceFactory;

  @OnStart()
  async start() {
    const getRoutes = () => {
      const urlRouterComponent = this.appContext.components.find((c) => c.factory.name === 'UrlRouter');
      if (!urlRouterComponent) {
        throw new Error('unable to find "UrlRouter"');
      }

      const urlRouter = this.appContext.createComponent(urlRouterComponent);
      return urlRouter.routes;
    };

    // TODO: good enough for now but needs some love
    const getFilters = (routeTree, baseFilters) => {
      const handlers = [];
      const paramsByHandler = {};
      baseFilters.forEach((filter) => {
        handlers.push(filter.handler);
        paramsByHandler[filter.handler] = filter.params;
      });
      (routeTree[FILTER_KEY] || []).forEach((val) => {
        let handlerRef;
        let params;
        if (util.isArray(val)) {
          handlerRef = val[0];
          params = val[1];
        } else {
          handlerRef = val;
          params = [];
        }

        const handlerComp = this.appContext.components.find((c) => c.factory === handlerRef);
        const handler = this.appContext.createComponent(handlerComp);
        if (!handlers.includes(handler)) {
          handlers.push(handler);
        }
        paramsByHandler[handler] = params;
      });
      return handlers.map((handler) =>
        ({
          handler,
          params: paramsByHandler[handler],
        })
      );
    };

    const collect = (routeTree, baseFilters = [], baseUrl = '') => {
      const resources = [];
      const filters = getFilters(routeTree, baseFilters);
      Object.keys(routeTree).forEach((key) => {
        if (key === FILTER_KEY) {
          return;
        }

        if (!key.startsWith('/')) {
          throw new Error(`invalid URL route '${key}': must start with an '/'`);
        }

        const url = key === '/' ? baseUrl : baseUrl + key;
        const routeVal = routeTree[key];
        if (routeVal.name) {
          resources.push(...this.resourceFactory.create(url, filters, routeVal));
        } else {
          resources.push(...collect(routeVal, filters, url));
        }
      });
      return resources;
    };

    this.resources = collect(getRoutes());
  }
}


export default Router;
