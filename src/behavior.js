import {isFunction} from 'lodash';


function verifyBehaveFunc(input) {
  const behaveFunc = input.prototype.behave;
  if (!isFunction(behaveFunc)) {
    throw new Error(`method 'behave' must be defined`);
  }
}


class BehaviorFactory {

  constructor(componentFactory) {
    this.componentFactory = componentFactory;
  }

  build(target, namespace, id) {
    verifyBehaveFunc(target);
    this.componentFactory.build(target, {
      injectTypeWhitelist: [],
      namespace: namespace,
      type: 'Behavior',
      id: id,
    });
  }
}


export default BehaviorFactory;
