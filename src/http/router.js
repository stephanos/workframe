import util from 'util';

import { ApplicationContext } from '../app';
import { Component, Inject, OnStart } from '../container';

import Resource from './resource';
import { Resource as ResourceDecorator } from './decorators';

const FILTER_KEY = 'filters';


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

    const createResources = (url, filters, controllerRef) => {
      const controllerComp = this.appContext.components.find((c) => c.factory === controllerRef);
      const controller = this.appContext.createComponent(controllerComp);

      controllerComp.decorations
        .filter((dec) => dec.type === ResourceDecorator)
        .forEach((resourceDec) => {
          const handlers = filters.slice();
          handlers.push({
            handler: {
              handle: async (dispatcher, request, response) => {
                const method = resourceDec.target.name;
                await controller[method](dispatcher, request, response);
              },
            },
          });

          function createHandler(list, prev) {
            const item = list[list.length - 1];
            const handler = async (dispatcher, request, response) => {
              const next = async () => {
                await prev(dispatcher, request, response);
              };
              await item.handler.handle(dispatcher, request, response, item.params, next);
            };

            if (list.length === 1) {
              return handler;
            }
            return createHandler(list.slice(0, 1), handler);
          }
          const rootHandler = createHandler(handlers);

          const handle = async (request, response) => {
            const dispatcher = null; // TOOD
            await rootHandler(dispatcher, request, response);
          };

          const httpMethod = resourceDec.parameters[0];
          const httpPath = url + resourceDec.parameters[1];
          const resource = new Resource(handle, httpMethod, httpPath);
          this.resources.push(resource);

          // console.log(resource);
        });
    };

    const collect = (routeTree, baseFilters = [], baseUrl = '') => {
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
      const filters = handlers.map((handler) =>
        ({
          handler,
          params: paramsByHandler[handler],
        })
      );

      Object.keys(routeTree).forEach((key) => {
        if (key === FILTER_KEY) {
          return;
        }
        if (!key.startsWith('/')) {
          throw new Error(`invalid URL route '${key}': must start with an '/'`);
        }

        const url = key === '/' ? baseUrl : baseUrl + key;
        const val = routeTree[key];
        if (val.name) {
          createResources(url, filters, val);
        } else {
          collect(val, filters, url);
        }
      });
    };

    collect(routes);
  }
}


export default Router;
