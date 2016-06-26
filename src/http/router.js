import { ApplicationContext } from '../app';
import { Component, Inject, OnStart } from '../container';

import FilterFactory from './filterFactory';
import Resource from './resource';
import ResourceFactory from './resourceFactory';

const FILTER_KEY = 'filters';


@Component()
class Router {

  resources: Array<Resource> = [];

  @Inject(ApplicationContext)
  appContext;

  @Inject(FilterFactory)
  filterFactory;

  @Inject(ResourceFactory)
  resourceFactory;


  @OnStart()
  async start() {
    const getRouteTree = () => {
      const urlRouterComponent = this.appContext.getComponentByName('UrlRouter');
      if (!urlRouterComponent) {
        throw new Error('unable to find "UrlRouter"');
      }

      const urlRouter = this.appContext.createComponent(urlRouterComponent);
      if (!urlRouter) {
        throw new Error('unable to create "UrlRouter"');
      }
      return urlRouter.routes;
    };

    const getResources = (routeTree, parentFilters = [], baseUrl = '') => {
      const filterFactories = routeTree[FILTER_KEY] || [];
      const filters = this.filterFactory.create(filterFactories, parentFilters);

      const resources = [];
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
          resources.push(...getResources(routeVal, filters, url));
        }
      });
      return resources;
    };

    this.resources = getResources(getRouteTree());
  }
}


export default Router;
