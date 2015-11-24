import {isFunction} from 'lodash';


class Injector {

  constructor(componentValidator) {
    this.componentValidator = componentValidator;
  }

  inject(target, key, reference) {
    if (!this.componentValidator.isComponent(target)) {
      throw new Error(`unable to inject into any property of '${target.name}': not a component`);
    }
    if (!isFunction(reference)) {
      throw new Error(`unable to inject '${reference}' into '${key}' of '${target.name}': not a function`);
    }
    if (!this.componentValidator.isComponent(reference)) {
      throw new Error(`unable to inject '${reference.name}' into '${key}' of '${target.name}': not a component`);
    }
    if (target._injectTypeWhitelist.indexOf(reference._type) === -1) {
      throw new Error(`unable to inject '${reference.name}' into '${key}' of '${target.name}': type '${reference._type}' is not allowed`);
    }

    target._dependencies = target._dependencies || new Map();
    if (target._dependencies[key]) {
      throw new Error(`unable to inject into '${target.name}': conflicting dependency`);
    }
    target._dependencies[key] = {
      name: reference._name,
      type: reference._type,
      namespace: reference._namespace,
    };
  }
}


export default Injector;
