import {List} from 'immutable';

import {ResolveError, KeyError} from './errors';


function checkIsNoDuplicate(container, id, Factory) {
  if (container._valueById[id] || container._componentById[id]) {
    throw new KeyError(`can not register '${Factory.name}': already registered`);
  }
}

function createInstance(container, rootComponent) {
  const cache = {};

  function resolve(component, trace) {
    function traceToString(list) {
      return `'${list.map((c) => c.factory.name).join('\' -> \'')}'`;
    }

    if (trace.contains(component)) {
      throw new ResolveError(`unable to resolve '${component.factory.name}': ` +
        `circular dependency ${traceToString(trace.push(component))}`);
    }

    if (container._componentById[component.id] === undefined) {
      let message = `unable to resolve '${component.factory.name}': not found`;
      if (!trace.isEmpty()) {
        message += ` (trace: ${traceToString(trace)})`;
      }
      throw new ResolveError(message);
    }

    const instance = container._valueById[component.id] || new component.factory();

    const dependencies = container._dependenciesById[component.id];
    if (dependencies) {
      for (const property in dependencies) {
        if (dependencies.hasOwnProperty(property)) {
          const depComp = dependencies[property];
          const depVal = cache[depComp.id] || resolve(depComp, trace.push(component));
          instance[property] = depVal;
          cache[depComp.id] = depVal;
        }
      }
    }
    return instance;
  }

  return resolve(rootComponent, List());
}


class Registry {

  _valueById = {};
  _idByComponent = {};
  _componentById = {};
  _dependenciesById = {};

  add(component) {
    const id = component.id;
    checkIsNoDuplicate(this, id, component);

    this._componentById[id] = component.factory;
    this._idByComponent[component.factory] = id;
    this._dependenciesById[id] = component.dependencies;
    if (component.type.isSingleton) {
      this._valueById[id] = createInstance(this, component);
    }
  }

  get(component) {
    return createInstance(this, component);
  }
}


export default Registry;
