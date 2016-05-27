import assert from 'assert';
import Reflect from 'core-js/es7/reflect';

import Schema from './schema';
import { Component } from './decorators';


describe('Component Schema', () => {
  it('should match an input with its type', () => {
    class MyType {}
    class MyComponent {}
    const schema = new Schema([MyType], { test: () => true });

    assert.equal(schema.typeOf(MyComponent), MyType);
  });

  it('should identify an object that is no Object as a component', () => {
    const schema = new Schema();
    assert.ok(!schema.isComponent('not an object'));
  });

  it('should identify an object with the expected decorator as a component', () => {
    class MyComponent {}
    Reflect.defineMetadata('decorator', [{ type: Component }], MyComponent);
    const schema = new Schema();

    assert.ok(schema.isComponent(MyComponent));
  });

  it('should not identify an object without any decorator as a component', () => {
    class MyComponent {}
    const schema = new Schema();

    assert.ok(!schema.isComponent(MyComponent));
  });

  it('should not identify an object without the expected decorator as a component', () => {
    class MyComponent {}
    class NotComponentDecorator {}
    Reflect.defineMetadata('decorator', [{ type: NotComponentDecorator }], MyComponent);
    const schema = new Schema();

    assert.ok(!schema.isComponent(MyComponent));
  });
});
