import assert from 'assert';
import Immutable from 'immutable';

import { State, StateComponentType } from './state';

describe('StateComponentType', () => {
  it('should not allow any injectable types', () => {
    const allowedTypes = StateComponentType.injectTypeWhitelist;
    assert.equal(allowedTypes.length, 0);
  });

  describe('validation', () => {
    it('should succeed when type of "State"', () => {
      class MyState extends State {}

      StateComponentType.verify(MyState);
    });

    it('should fail when not type of "State"', () => {
      class MyState {}

      assert.throws(() => StateComponentType.verify(MyState), err => err.message === `must inherit from 'State'`);
    });
  });
});

describe('State', () => {
  describe('after construction', () => {
    it('should return empty Map', () => {
      const state = new State();

      assert.deepEqual(state.get(), Immutable.Map());
    });
  });

  it('should update', () => {
    const state = new State();

    state.update(null, map => map.set('key', 'value'));

    assert.deepEqual(state.get().toJS(), Immutable.Map({ key: 'value' }).toJS());
  });

  it('should fail to update for invalid value', () => {
    const state = new State();

    assert.throws(() => state.update(null, () => undefined), err => err.message === `invalid state update: must be Immutable.Map`);
  });
});