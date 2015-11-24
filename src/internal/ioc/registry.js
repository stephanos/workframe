import {isFunction} from 'lodash';
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
  return descriptor.namespace + ':' + descriptor.type + ':' + descriptor.id;
}

function findComponent(container, id) {
  const Component = container._componentById[id];
  if (Component) {
    return Component;
  }
  return null;
}

function resolveComponent(container, rootId) {
  const cache = {};

  function resolve(id, trace) {
    if (trace.contains(id)) {
      throw new ResolveError(`unable to resolve Component for ID '${id}': ` +
        `circular dependency '${trace.push(id).join('\' -> \'')}'`);
    }

    const Component = findComponent(container, id);
    if (Component === null) {
      let message = `unable to resolve Component for ID '${id}': not found`;
      if (!trace.isEmpty()) {
        message += ` (trace: '${trace.join('\' -> \'')}')`;
      }
      throw new ResolveError(message);
    }

    const instance = container._singletonsById[id] || new Component();

    if (Component.dependencies) {
      for (const [property, depDescr] of Component.dependencies) {
        const depId = generateId(depDescr);
        const depComp = cache[depId] || resolve(depId, trace.push(id));
        cache[depId] = depComp;
        instance[property] = depComp;
      }
    }
    return instance;
  }

  return resolve(rootId, List());
}

function addComponent(container, Component) {
  if (!isFunction(Component)) {
    throw new EntryError(`can not add '${Component}': invalid value`);
  }

  const id = generateId(Component);
  if (findComponent(container, id)) {
    throw new KeyError(`can not register Component '${Component.name}': already registered`);
  }

  container._componentById[id] = Component;

  if (Component.isSingleton) {
    container._singletonsById[id] = resolveComponent(container, id);
  }
}


class Registry {

  constructor() {
    this._componentById = {};
    this._singletonsById = {};
  }

  add(Component) {
    addComponent(this, Component);
  }

  get(id) {
    return resolveComponent(this, id);
  }
}


export default Registry;
