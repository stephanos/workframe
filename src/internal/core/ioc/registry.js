/* eslint no-param-reassign:0 */
import { List } from 'immutable';

import { ResolveError, KeyError } from './errors';


function checkIsNoDuplicate(container, id, component) {
  if (container._valueById[id] || container._componentById[id]) {
    throw new KeyError(`can not register '${component.name}': already registered`);
  }
}

function createInstance(container, rootComponent, proxyFn) {
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

    const instance = container._valueById[component.id] || component.newInstance();
    container._valueById[component.id] = instance;

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

    return proxyFn(instance);
  }

  return resolve(rootComponent, List());
}


class Registry {

  _valueById = {};
  _idByComponent = {};
  _componentById = {};
  _dependenciesById = {};

  // TODO: use something like https://github.com/cpettitt/graphlib
  _connectionByActor = {};
  _connectionBySubject = {};

  add(component) {
    const id = component.id;
    checkIsNoDuplicate(this, id, component);

    this._componentById[id] = component.factory;
    this._idByComponent[component.factory] = id;
    this._dependenciesById[id] = component.dependencies;
  }

  get(component, proxyFn = (input) => input) {
    return createInstance(this, component, proxyFn);
  }

  setConnection(actor, kind, subject) {
    this._connectionByActor[actor] = subject;

    this._connectionBySubject[subject] = this._connectionBySubject[subject] || [];
    this._connectionBySubject[subject].push(actor);
  }

  getConnection(kind, component) {
    return this._connectionBySubject[component][0];
  }
}


export default Registry;
