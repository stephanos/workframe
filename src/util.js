import {isArray, isString} from 'lodash';

import types from './types';


const idRegex = new RegExp('^([a-zA-Z])+$');
const nsRegex = new RegExp('^([a-z])+$');

const typeNames = types.map((type) => type.typeName);


class ComponentValidator {

  isValidId(id) {
    return id !== undefined && isString(id) && idRegex.test(id);
  }

  isValidNamespace(ns) {
    return ns !== undefined && isString(ns) && nsRegex.test(ns);
  }

  isValidType(t) {
    return t !== undefined && typeNames.indexOf(t) !== -1;
  }

  isValidInjectTypeWhitelist(list) {
    return list !== null && isArray(list);
  }

  isComponent(input) {
    return this.isValidId(input.id)
      && this.isValidType(input.type)
      && this.isValidNamespace(input.namespace)
      && this.isValidInjectTypeWhitelist(input.injectTypeWhitelist);
  }
}


export default ComponentValidator;
