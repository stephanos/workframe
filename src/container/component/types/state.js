import Immutable from 'immutable';


class State {

  data = Immutable.Map();

  update(__dispatcher, fn) {
    // TODO: validate it's still a Map()
    const result = fn(this.data);
    if (!(result instanceof Immutable.Map)) {
      throw new Error('invalid state update: must be Immutable.Map');
    }
    this.data = result;
  }

  get() {
    return this.data;
  }
}


class StateComponentType {

  static typeName = 'State';
  static injectTypeWhitelist = [];

  static verify(target) {
    if (!(target.prototype instanceof State)) {
      throw new Error('must inherit from \'State\'');
    }
  }
}


export { State, StateComponentType };
