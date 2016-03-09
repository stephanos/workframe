import ComponentFactory from './internal/core/component/factory';
import Validator from './internal/core/component/validator';
import types from './internal/core/component/types';

import CommandHandler from './internal/es/command/commandHandler';
import EventStore from './internal/es/store/store';
import MemoryStorage from './internal/es/store/storage/memory';

import Injector from './internal/core/ioc/injector';
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
