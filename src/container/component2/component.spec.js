import assert from 'assert';

import Component from './component';


class MyClass {}

describe('Component', () => {
  it('should be created', () => {
    const type = {};
    const decorations = [{}];
    const comp = new Component('42', type, MyClass, decorations);

    assert.equal(comp.id, '42');
    assert.equal(comp.type, type);
    assert.equal(comp.factory, MyClass);
    assert.equal(comp.decorations, decorations);
  });
});
