import ComponentFactory from './internal/core/component/factory';
import Validator from './internal/core/component/validator';
import types from './internal/core/component/types';

import CommandHandler from './es/command/commandHandler';
import EventStore from './es/store/store';
import MemoryStorage from './es/store/storage/memory';

import Registry from './internal/core/ioc/registry';

import Router from './internal/core/router';
import API from './internal/api';

import idGenerator from './internal/core/util/uuid';
import clock from './internal/core/util/clock';

const componentRegistry = new Registry();
const componentValidator = new Validator();

const storage = new MemoryStorage(idGenerator, clock);
const store = new EventStore(storage, idGenerator, clock);
const commandHandler = new CommandHandler(store, componentRegistry);

const componentFactory = new ComponentFactory(types, componentRegistry, componentValidator);

class ComponentBase {}
export function Component() {
  return () => {};
}
Component.Base = ComponentBase;

class DataBase {}
export function Data() {
  return () => {};
}
Data.Base = DataBase;

export function Inject() {
  // dummy placeholder
}

const router = new Router(componentRegistry, commandHandler);
export function bootstrap(opts) {
  return new API(types, router, componentFactory, opts);
}
