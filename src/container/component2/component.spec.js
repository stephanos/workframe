import assert from 'assert';

import Component from './component';


class MyClass {}

describe('Component', () => {
  it('should be created', () => {
    const type = {};
    const comp = new Component('42', type, MyClass, ['param'], ['decorator']);

    assert.equal(comp.id, '42');
    assert.equal(comp.type, type);
    assert.equal(comp.factory, MyClass);
    assert.deepEqual(comp.parameters, ['param']);
    assert.deepEqual(comp.decorations, ['decorator']);
  });
});
