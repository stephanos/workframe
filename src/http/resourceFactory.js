import { ApplicationContext } from '../app';
import { Component, Inject } from '../container';

import Resource from './resource';
import { Resource as ResourceDecorator } from './decorators';


@Component()
class ResourceFactory {

  @Inject(ApplicationContext)
  appContext;


  create(url, filters, controllerFactory): Array<Resource> {
    const resources = [];
    const controllerComp = this.appContext.components.find((c) => c.factory === controllerFactory);
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
        resources.push(resource);
      });

    return resources;
  }
}


export default ResourceFactory;
