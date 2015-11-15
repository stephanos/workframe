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


class AccessorFactory {

  constructor(componentFactory) {
    this.componentFactory = componentFactory;
  }

  build(target, namespace, id) {
    verifyAccessorFunc(target);
    this.componentFactory.build(target, {
      injectTypeWhitelist: ['Accessor', 'Behavior', 'Command', 'Query'],
      namespace: namespace,
      type: 'Accessor',
      id: id,
    });
  }
}


export default AccessorFactory;
