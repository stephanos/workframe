import assert from 'assert';

import Component from './component';

describe('Component', () => {
  it('should return factory', () => {
    class MyClass {}

    const comp = new Component(MyClass);
    assert.equal(comp.factory, MyClass);
  });

  it('should return "id"', () => {
    assert.throws(() => new Component('dummy'), err => err.message === '\'dummy\' is not a function');
  });

  it('should set and get "namespace"', () => {
    class MyClass {}

    const comp = new Component(MyClass);
    assert.equal(comp.namespace, undefined);

    comp.namespace = 'namespace';
    assert.equal(comp.namespace, 'namespace');
  });

  it('should set and get "name"', () => {
    class MyClass {}

    const comp = new Component(MyClass);
    assert.equal(comp.name, undefined);

    comp.name = 'name';
    assert.equal(comp.name, 'name');
  });

  it('should set and get "type"', () => {
    class MyClass {}

    const comp = new Component(MyClass);
    assert.equal(comp.type, undefined);

    comp.type = 'type';
    assert.equal(comp.type, 'type');
  });

  it('should add and get "dependencies"', () => {
    class MyDep {}

    class MyClass {}

    const comp = new Component(MyClass);
    assert.deepEqual(comp.dependencies, {});

    comp.addDependency('dep', MyDep);
    assert.deepEqual(comp.dependencies, { dep: new Component(MyDep) });

    assert.throws(() => comp.addDependency('dep', MyDep), err => err.message === 'dep already exists');
  });
});