import {isArray, isString} from 'lodash';


const idRegex = new RegExp('^([a-zA-Z])+$');
const nsRegex = new RegExp('^([a-z])+$');

const accessor = 'Accessor';
const behavior = 'Behavior';
const loader = 'Loader';
const mutator = 'Mutator';
const processor = 'Processor';
const validTypes = [
  accessor, behavior, loader, mutator, processor,
];


class ComponentValidator {

  isValidId(id) {
    return id !== undefined && isString(id) && idRegex.test(id);
  }

  isValidNamespace(ns) {
    return ns !== undefined && isString(ns) && nsRegex.test(ns);
  }

  isValidType(t) {
    return t !== undefined && validTypes.indexOf(t) !== -1;
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
