import assert from 'assert';

import Factory from './factory';


describe('Factory', () => {
  it('should create a component from a constructor', () => {
    // TODO
  });

  it('should fail to create a component from an invalid constructor', () => {
    assert.throws(
      () => new Factory().create('dummy'),
      (err) => err.message === '\'dummy\' is not a function');
  });

  it('should fail to create a component with an unknown type', () => {
    class Component {}
    assert.throws(
      () => new Factory({ typeOf: () => undefined }).create(Component),
      (err) => err.message === '\'class Component {}\' can not be identified as any known component type');
  });
});
