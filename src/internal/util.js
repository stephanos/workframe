import {isArray, isString} from 'lodash';

import types from './types';


const nameRegex = new RegExp('^([a-zA-Z])+$');
const nsRegex = new RegExp('^([a-z])+$');

const typeNames = types.map((type) => type.typeName);


class ComponentValidator {

  isValidName(name) {
    return name !== undefined && isString(name) && nameRegex.test(name);
  }

  isValidNamespace(ns) {
    return ns !== undefined && isString(ns) && nsRegex.test(ns);
  }

  isValidType(t) {
    return t !== undefined && typeNames.indexOf(t) !== -1;
  }

  isValidInjectTypeWhitelist(list) {
    if (list === null || !isArray(list)) {
      return false;
    }
    for (const typeName of list) {
      if (!this.isValidType(typeName)) {
        return false;
      }
    }
    return true;
  }

  isComponent(input) {
    return this.isValidName(input._name)
      && this.isValidType(input._type)
      && this.isValidNamespace(input._namespace)
      && this.isValidInjectTypeWhitelist(input._injectTypeWhitelist);
  }
}


export default ComponentValidator;
