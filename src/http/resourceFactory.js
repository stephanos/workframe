import { ApplicationContext } from '../app';
import { Component, Inject } from '../container';

import Resource from './resource';
import { Resource as ResourceDecorator } from './decorators';


const HANDLE_METHOD_NAME = '__handle';


function joinHandlers(list, prev) {
  const item = list[list.length - 1];
  const handler = async (dispatcher, request, response) => {
    const next = async () => {
      await prev(dispatcher, request, response);
    };
    await item.handler[HANDLE_METHOD_NAME](dispatcher, request, response, item.params, next);
  };

  if (list.length === 1) {
    return handler;
  }

  return joinHandlers(list.slice(0, 1), handler);
}


@Component()
class ResourceFactory {

  @Inject(ApplicationContext)
  appContext;


  create(url, filters, controllerFactory): Array<Resource> {
    const resources = [];
    const controllerComp = this.appContext.getComponentByFactory(controllerFactory);
    const controller = this.appContext.createComponent(controllerComp);

    controllerComp.decorations
      .filter((dec) => dec.type === ResourceDecorator)
      .forEach((resourceDec) => {
        const handlers = filters.slice();
        const methodName = `__${resourceDec.target.name}`; // TODO: call via dispatcher
        handlers.push({
          handler: {
            [HANDLE_METHOD_NAME]: controller[methodName].bind(controller),
          },
        });

        const rootHandler = joinHandlers(handlers);
        const httpMethod = resourceDec.parameters[0];
        const httpPath = url + (resourceDec.parameters[1] || '');
        resources.push(new Resource(rootHandler, httpMethod, httpPath));
      });

    return resources;
  }
}


export default ResourceFactory;
