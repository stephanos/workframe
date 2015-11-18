import {isFunction} from 'lodash';


function verifyAccessorFunc(input) {
  const accessFunc = input.prototype.access;
  if (!isFunction(accessFunc)) {
    throw new Error(`method 'access' must be defined`);
  }
  if (accessFunc.length !== 1) {
    throw new Error(`method 'access' must have exactly 1 parameter`);
  }
}


class AccessorComponentType {

  static typeName = 'Accessor';
  static injectTypeWhitelist = ['Accessor', 'Behavior', 'Command', 'Query'];

  static verify(target) {
    verifyAccessorFunc(target);
  }
}


export default AccessorComponentType;
