import ComponentFactory from './internal/component/factory';
import Validator from './internal/component/validator';
import types from './internal/component/types';
import { State } from './internal/component/types/state';

import Injector from './internal/ioc/injector';
import Registry from './internal/ioc/registry';

import Dispatcher from './internal/dispatcher';
import API from './internal/api';


const componentRegistry = new Registry();
const componentValidator = new Validator();

const componentFactory = new ComponentFactory(types, componentRegistry, componentValidator);
export function component(...args) {
  return (target) => {
    componentFactory.build(target, ...args);
  };
}

export function inject(...args) {
  return Injector.inject(...args);
}

const dispatcher = new Dispatcher(componentRegistry);
export function bootstrap() {
  return new API(dispatcher);
}

export { State };
