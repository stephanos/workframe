import ComponentFactory from './factory';
import ComponentValidator from './util';
import Injector from './injector';
import Registry from './registry';

import types from './types';


function toDecorator(factory, ...args) {
  return (target) => {
    return factory.build(target, ...args);
  };
}

const registry = new Registry();
const componentValidator = new ComponentValidator();
const componentFactory = new ComponentFactory(types, registry, componentValidator);
export function component(...args) {
  return toDecorator(componentFactory, ...args);
}

const injector = new Injector(componentValidator);
export function inject(...args) {
  return toDecorator(injector, ...args);
}
