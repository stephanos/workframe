import ComponentFactory from './internal/component/factory';
import Validator from './internal/component/validator';
import types from './internal/component/types';

import CommandHandler from './internal/es/command/commandHandler';
import EventStore from './internal/es/store/store';
import MemoryStorage from './internal/es/store/storage/memory';

import Injector from './internal/ioc/injector';
import Registry from './internal/ioc/registry';

import Router from './internal/router';
import API from './internal/api';

import idGenerator from './internal/util/uuid';
import clock from './internal/util/clock';


const componentRegistry = new Registry();
const componentValidator = new Validator();

const storage = new MemoryStorage(idGenerator, clock);
const store = new EventStore(storage, idGenerator, clock);
const commandHandler = new CommandHandler(store, componentRegistry);

const componentFactory = new ComponentFactory(types, componentRegistry, componentValidator);
export function Component(...args) {
  return (target) => {
    componentFactory.build(target, args);
  };
}

class RecordBase {
}

export function Record(...args) {
  return (target) => {
    componentFactory.build(target, args);
  };
}
Record.Base = RecordBase;

export function Inject(...args) {
  return Injector.inject(...args);
}

const router = new Router(componentRegistry, commandHandler);
export function bootstrap(opts) {
  return new API(types, router, componentFactory, opts);
}
