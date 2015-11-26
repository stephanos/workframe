import Immutable from 'immutable';


class State {

  _data;

  constructor() {
    this._data = Immutable.Map();
  }


  update(fn) {
    // TODO: validate it's still a Map()
    this._data = fn(this._data);
  }

  get() {
    return this._data;
  }
}


class StateComponentType {

  static typeName = 'State';
  static isSingleton = true;
  static injectTypeWhitelist = [];

  static verify(target) {
    if (!(target.prototype instanceof State)) {
      throw new Error(`must inherit from 'State'`);
    }
  }
}


export {State, StateComponentType};
