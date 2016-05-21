import assert from 'assert';

import Component from './component';


class MyClass {}

describe('Component', () => {
  it('should be created', () => {
    const type = {};
    const connections = [{}];
    const comp = new Component('42', type, MyClass, connections);

    assert.equal(comp.id, '42');
    assert.equal(comp.type, type);
    assert.equal(comp.factory, MyClass);
    assert.equal(comp.connections, connections);
  });

  it('should create a new instance', () => {
    const comp = new Component('42', {}, MyClass, []);
    const inst = comp.newInstance();

    assert.ok(inst instanceof MyClass);
  });
});
