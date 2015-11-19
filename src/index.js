import ComponentFactory from './factory';
import ComponentValidator from './util';
import Injector from './injector';
import Registry from './registry';

import types from './types';


const registry = new Registry();
const componentValidator = new ComponentValidator();
const componentFactory = new ComponentFactory(types, registry, componentValidator);
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
