import {isFunction} from 'lodash';


function verifyBehaveFunc(input) {
  const behaveFunc = input.prototype.behave;
  if (!isFunction(behaveFunc)) {
    throw new Error(`method 'behave' must be defined`);
  }
}


class BehaviorComponentType {

  static typeName = 'Behavior';
  static injectTypeWhitelist = [];

  static verify(target) {
    verifyBehaveFunc(target);
  }
}


export default BehaviorComponentType;
