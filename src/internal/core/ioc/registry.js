/* eslint no-param-reassign:0 */
import { List } from 'immutable';

import { ResolveError, KeyError } from './errors';


function checkIsNoDuplicate(container, id, component) {
  if (container.valueById[id] || container.componentById[id]) {
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

    if (container.componentById[component.id] === undefined) {
      let message = `unable to resolve '${component.factory.name}': not found`;
      if (!trace.isEmpty()) {
        message += ` (trace: ${traceToString(trace)})`;
      }
      throw new ResolveError(message);
    }

    const instance = container.valueById[component.id] || component.newInstance();
    container.valueById[component.id] = instance;

    const dependencies = container.dependenciesById[component.id];
    if (dependencies) {
      Object.keys(dependencies).forEach((property) => {
        if (dependencies.hasOwnProperty(property)) {
          const depComp = dependencies[property];
          const depVal = cache[depComp.id] || resolve(depComp, trace.push(component));
          instance[property] = depVal;
          cache[depComp.id] = depVal;
        }
      });
    }

    return proxyFn(instance);
  }

  return resolve(rootComponent, List());
}


class Registry {

  valueById = {};
  idByComponent = {};
  componentById = {};
  dependenciesById = {};
  connectionByActor = {};
  connectionBySubject = {};

  add(component) {
    const id = component.id;
    checkIsNoDuplicate(this, id, component);

    this.componentById[id] = component.factory;
    this.idByComponent[component.factory] = id;
    this.dependenciesById[id] = component.dependencies;
  }

  get(component, proxyFn = (input) => input) {
    return createInstance(this, component, proxyFn);
  }

  setConnection(actor, kind, subject) {
    this.connectionByActor[actor] = subject;

    this.connectionBySubject[subject] = this.connectionBySubject[subject] || [];
    this.connectionBySubject[subject].push(actor);
  }

  getConnection(kind, component) {
    return this.connectionBySubject[component][0];
  }
}


export default Registry;
