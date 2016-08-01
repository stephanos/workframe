import { Component } from '../container';

import Resource from './resource';


/* eslint no-param-reassign:0 */
function createRootHandler(handlers, chain) {
  if (handlers.length === 0) {
    return chain;
  }

  const item = handlers[handlers.length - 1];
  const handler = async (dispatcher, request, response) => {
    const next = async () => {
      await chain(dispatcher, request, response);
    };

    const result = await item.handle(dispatcher, request, response, item.params, next);
    if (result) {
      response.body = result;
    }
  };

  return createRootHandler(handlers.slice(0, handlers.length - 1), handler);
}


@Component()
class ResourceFactory {

  create(url, filters, endpoints): Array<Resource> {
    const resources = [];

    endpoints.forEach((endpoint) => {
      const handlers = filters.slice();
      handlers.push(endpoint);

      const rootHandler = createRootHandler(handlers);
      const httpMethod = endpoint.method;
      const httpPath = url + endpoint.path;
      const resource = new Resource(rootHandler, httpMethod, httpPath);
      resources.push(resource);
    });

    return resources;
  }
}


export default ResourceFactory;
