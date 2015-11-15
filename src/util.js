import {isArray, isString} from 'lodash';


const idRegex = new RegExp('^([a-zA-Z])+$');
function isValidId(id) {
  return id !== undefined && isString(id) && idRegex.test(id);
}

const nsRegex = new RegExp('^([a-z])+$');
function isValidNamespace(ns) {
  return ns !== undefined && isString(ns) && nsRegex.test(ns);
}

const accessor = 'Accessor';
const behavior = 'Behavior';
const loader = 'Loader';
const mutator = 'Mutator';
const processor = 'Processor';
const validTypes = [
  accessor, behavior, loader, mutator, processor,
];
function isValidType(t) {
  return t !== undefined && validTypes.indexOf(t) !== -1;
}

function isValidInjectTypeWhitelist(list) {
  return list !== null && isArray(list);
}

export function isComponent(input) {
  return isValidId(input.id)
    && isValidType(input.type)
    && isValidNamespace(input.namespace)
    && isValidInjectTypeWhitelist(input.injectTypeWhitelist);
}
