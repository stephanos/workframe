import ComponentFactory from './internal/component/factory';
import Validator from './internal/component/validator';
import types from './internal/component/types';
import { State } from './internal/component/types/state';

import Injector from './internal/ioc/injector';
import Registry from './internal/ioc/registry';

import Router from './internal/router';
import API from './internal/api';


const componentRegistry = new Registry();
const componentValidator = new Validator();

const componentFactory = new ComponentFactory(types, componentRegistry, componentValidator);
export function Component(...args) {
  return (target) => {
    componentFactory.build(target, args);
  };
}

export function Inject(...args) {
  return Injector.inject(...args);
}

const router = new Router(componentRegistry);
export function bootstrap(opts) {
  return new API(types, router, componentFactory, opts);
}

export { State };
