import Immutable from 'immutable';

class State {

  _data = Immutable.Map();

  update(__dispatcher, fn) {
    // TODO: validate it's still a Map()
    const result = fn(this._data);
    if (!(result instanceof Immutable.Map)) {
      throw new Error(`invalid state update: must be Immutable.Map`);
    }
    this._data = result;
  }

  get() {
    return this._data;
  }
}

class StateComponentType {

  static typeName = 'State';
  static injectTypeWhitelist = [];

  static verify(target) {
    if (!(target.prototype instanceof State)) {
      throw new Error(`must inherit from 'State'`);
    }
  }
}

export { State, StateComponentType };