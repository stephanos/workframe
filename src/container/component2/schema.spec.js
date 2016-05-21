import assert from 'assert';
import Reflect from 'core-js/es7/reflect';

import Schema from './schema';


class ComponentDecorator {}

describe('Component Schema', () => {
  it('should identify an object with the expected decorator as a component', () => {
    class Component {}
    Reflect.defineMetadata('decorator', [{ type: ComponentDecorator }], Component);
    const schema = new Schema([], ComponentDecorator);

    assert.ok(schema.isComponent(Component));
  });

  it('should not identify an object without any decorator as a component', () => {
    class Component {}
    const schema = new Schema([], ComponentDecorator);

    assert.ok(!schema.isComponent(Component));
  });

  it('should not identify an object without the expected decorator as a component', () => {
    class Component {}
    class NotComponentDecorator {}
    Reflect.defineMetadata('decorator', [{ type: NotComponentDecorator }], Component);
    const schema = new Schema([], ComponentDecorator);

    assert.ok(!schema.isComponent(Component));
  });
});
