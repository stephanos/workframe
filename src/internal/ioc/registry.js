import {isFunction, isObject} from 'util';
import {List} from 'immutable';


export class ResolveError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ResolveError';
  }
}

export class EntryError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'EntryError';
  }
}

export class KeyError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'KeyError';
  }
}

function generateId(descriptor) {
  return descriptor.namespace + ':' + descriptor.name + ':' + descriptor.type;
}

function checkIsFactory(container, id, Factory) {
  if (!isFunction(Factory)) {
    throw new EntryError(`can not add '${Factory}': invalid value`);
  }
}

function checkIsNoDuplicate(container, id, Factory) {
  if (container._valueById[id] || container._factoryById[id]) {
    throw new KeyError(`can not register '${Factory.name}': '${id}' is already registered`);
  }
}

function createInstance(container, rootId) {
  const cache = {};

  function resolve(id, trace) {
    if (trace.contains(id)) {
      throw new ResolveError(`unable to resolve ID '${id}': ` +
        `circular dependency '${trace.push(id).join('\' -> \'')}'`);
    }

    const Factory = container._factoryById[id];
    if (!Factory) {
      let message = `unable to resolve ID '${id}': not found`;
      if (!trace.isEmpty()) {
        message += ` (trace: '${trace.join('\' -> \'')}')`;
      }
      throw new ResolveError(message);
    }

    const instance = container._valueById[id] || new Factory();

    const dependencies = container._dependenciesById[id];
    if (dependencies) {
      for (const [property, depDescr] of dependencies) {
        const depId = generateId(depDescr);
        const depVal = cache[depId] || resolve(depId, trace.push(id));
        cache[depId] = depVal;
        instance[property] = depVal;
      }
    }
    return instance;
  }

  return resolve(rootId, List());
}


class Registry {

  _valueById = {};
  _factoryById = {};
  _dependenciesById = {};

  add(Factory, opts) {
    const id = generateId(opts);
    checkIsFactory(this, id, Factory);
    checkIsNoDuplicate(this, id, Factory);

    this._factoryById[id] = Factory;
    this._dependenciesById[id] = opts.dependencies;
    if (opts.isSingleton) {
      this._valueById[id] = createInstance(this, id);
    }
  }

  get(descriptor) {
    if (!isObject(descriptor)) {
      throw new ResolveError(`unable to resolve: invalid descriptor '${descriptor}'`);
    }

    return createInstance(this, generateId(descriptor));
  }
}


export default Registry;
