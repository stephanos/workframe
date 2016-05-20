import ComponentFactory from './core/component/factory';
import Validator from './core/component/validator';
import types from './core/component/types';

import CommandHandler from './es/command/commandHandler';
import EventStore from './es/store/store';
import MemoryStorage from './es/store/storage/memory';

import Registry from './core/ioc/registry';

import Router from './core/router';
import API from './api';

import idGenerator from './core/util/uuid';
import clock from './core/util/clock';

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
