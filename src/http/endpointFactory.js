import { groupBy, merge } from 'lodash';

import { ApplicationContext } from '../app';
import { Component, Inject } from '../container';

import { Consumes, Resource } from './decorators';
import Endpoint from './endpoint';


@Component()
class EndpointFactory {

  @Inject(ApplicationContext)
  appContext;


  create(controllerFactory): Array<Endpoint> {
    const endpoints = [];

    const controllerComp = this.appContext.getComponentByFactory(controllerFactory);
    const controller = this.appContext.createComponent(controllerComp);
    const controllerDecorations = controllerComp.decorations.filter((d) => !d.target);

    const endpointsByName = groupBy(controllerComp.decorations, 'target.name');
    Object.keys(endpointsByName).forEach((methodName) => {
      const decorationsByType =
        groupBy(merge({}, controllerDecorations, endpointsByName[methodName]), 'type');

      const resourceDecorators = decorationsByType[Resource];
      if (!resourceDecorators) {
        return;
      }
      const resourceDecorator = resourceDecorators[0];
      const httpMethod = resourceDecorator.parameters[0];
      const httpPath = resourceDecorator.parameters[1];

      const consumeDecorators = decorationsByType[Consumes];
      const httpAcceptContent = consumeDecorators ? consumeDecorators[0].parameters[0] : null;

      const handle = async (dispatcher, request, response) => {
        if (request.method.toUpperCase() !== 'GET' && httpAcceptContent) {
          const accept = request.is(httpAcceptContent);
          if (!accept) {
            response.throw(415, `expected '${httpAcceptContent}'`); // TODO: make customizable
          }
        }

        return await dispatcher.invoke(module, controller, controller[`__${methodName}`], [request, response]);
      };

      const endpoint = new Endpoint(handle, httpMethod, httpPath);
      endpoints.push(endpoint);
    });

    return endpoints;
  }
}


export default EndpointFactory;
