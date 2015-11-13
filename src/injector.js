import {isFunction} from 'lodash';

import {isComponent} from './util';


class Injector {

  isComponent(input) {
    return isComponent(input);
  }

  run(reference, target, key) {
    if (!this.isComponent(target)) {
      throw new Error(`unable to inject into any property of '${target.name}': not a component`);
    }
    if (!isFunction(reference)) {
      throw new Error(`unable to inject '${reference}' into '${key}' of '${target.name}': not a function`);
    }
    if (!this.isComponent(reference)) {
      throw new Error(`unable to inject '${reference.name}' into '${key}' of '${target.name}': not a component`);
    }
    if (target.injectTypeWhitelist.indexOf(reference.type) === -1) {
      throw new Error(`unable to inject '${reference.name}' into '${key}' of '${target.name}': type '${reference.type}' is not allowed`);
    }

    target.dependencies = target.dependencies || {};
    if (target.dependencies[key]) {
      throw new Error(`unable to inject into '${target.name}': conflicting dependency`);
    }
    target.dependencies[key] = {
      id: reference.id,
      type: reference.type,
      namespace: reference.namespace,
    };
  }
}


export default Injector;
