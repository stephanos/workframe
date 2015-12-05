import ComponentFactory from './internal/component/factory';
import Validator from './internal/component/validator';
import types from './internal/component/types';

import Injector from './internal/ioc/injector';
import Registry from './internal/ioc/registry';

import Dispatcher from './internal/dispatcher';
import {State} from './internal/state';
import API from './internal/api';


const componentRegistry = new Registry();
const componentValidator = new Validator();

const componentFactory = new ComponentFactory(types, componentRegistry, componentValidator);
export function component(...args) {
  return (target) => {
    return componentFactory.build(target, ...args);
  };
}


const injector = new Injector();
export function inject(...args) {
  return (target, key) => {
    return injector.inject(target, key, ...args);
  };
}


const dispatcher = new Dispatcher(componentRegistry);
export function bootstrap() {
  return new API(dispatcher);
}

export {State};
