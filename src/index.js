import ComponentFactory from './internal/factory';
import ComponentValidator from './internal/util';
import Dispatcher from './internal/dispatcher';
import Injector from './internal/ioc/injector';
import Registry from './internal/ioc/registry';
import API from './internal/api';

import types from './internal/types';


const componentRegistry = new Registry();
const componentValidator = new ComponentValidator();


const componentFactory = new ComponentFactory(types, componentRegistry, componentValidator);
export function component(...args) {
  return (target) => {
    return componentFactory.build(target, ...args);
  };
}


const injector = new Injector(componentValidator);
export function inject(...args) {
  return (target, key) => {
    return injector.inject(target, key, ...args);
  };
}


const dispatcher = new Dispatcher(componentRegistry, componentValidator);
export function bootstrap() {
  return new API(dispatcher);
}
