import ComponentFactory from './factory';
import ComponentValidator from './util';
import Dispatcher from './dispatcher';
import Injector from './injector';
import Registry from './registry';
import API from './api';

import types from './types';


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
