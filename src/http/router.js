import { ApplicationContext } from '../app';
import { Component, Inject } from '../container';

import Resource from './resource';
import { Resource as ResourceDecorator } from './decorators';


@Component()
class Router {

  resources = [];

  @Inject(ApplicationContext)
  appContext;


  async start() {
    this.appContext.components
      .filter((comp) => comp.type.name === 'Controller')
      .forEach((controllerComp) => {
        const controller = this.appContext.createComponent(controllerComp);
        controllerComp.decorations
          .filter((dec) => dec.type === ResourceDecorator)
          .forEach((resourceDec) => {
            const httpMethod = resourceDec.parameters[0];
            const httpPath = resourceDec.parameters[1];
            const handler = async (request, response) => {
              const method = resourceDec.target.name;
              const dispatcher = undefined; // TODO!
              controller[method](dispatcher, request, response);
            };
            const resource = new Resource(handler, httpMethod, httpPath);
            this.resources.push(resource);
          });
      });
  }
}


export default Router;
