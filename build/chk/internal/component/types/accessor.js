import { isFunction } from 'lodash';

function verifyAccessorFunc(input) {
  const accessFunc = input.prototype.access;
  if (!isFunction(accessFunc)) {
    throw new Error(`method 'access' must be defined`);
  }
  // if (accessFunc.length !== 1) {
  //   throw new Error(`method 'access' must have exactly 1 parameter`);
  // }
}

class AccessorComponentType {

  static typeName = 'Accessor';
  static injectTypeWhitelist = ['Accessor', 'Behavior', 'Mutator', 'Viewer'];

  static verify(target) {
    verifyAccessorFunc(target);
  }

  static addRelation(registry, input, opts) {
    registry.setConnection(input, 'handles', opts[1]);
  }
}

export default AccessorComponentType;