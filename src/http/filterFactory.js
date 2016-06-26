import util from 'util';

import { ApplicationContext } from '../app';
import { Component, Inject } from '../container';

import Filter from './filter';


@Component()
class FilterFactory {

  @Inject(ApplicationContext)
  appContext;


  // TODO: good enough for now but needs some love
  create(handlerFactories, parentFilters) {
    const handlers = [];
    const paramsByHandler = {};
    parentFilters.forEach((filter) => {
      handlers.push(filter.handler);
      paramsByHandler[filter.handler] = filter.params;
    });

    handlerFactories.forEach((val) => {
      let handlerFactory;
      let params;
      if (util.isArray(val)) {
        handlerFactory = val[0];
        params = val[1];
      } else {
        handlerFactory = val;
        params = {};
      }

      const handlerComp = this.appContext.getComponentByFactory(handlerFactory);
      const handler = this.appContext.createComponent(handlerComp);
      if (!handlers.includes(handler)) {
        handlers.push(handler);
      }
      paramsByHandler[handler] = params;
    });

    return handlers.map((h) => new Filter(h, paramsByHandler[h]));
  }
}


export default FilterFactory;
