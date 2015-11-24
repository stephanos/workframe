import assert from 'assert';
import sinon from 'sinon';

import Dispatcher from './dispatcher';


let dispatcher;

let isComponent;
let getComponent;

describe('Dispatcher', () => {
  beforeEach(() => {
    isComponent = sinon.stub().returns(true);
    getComponent = sinon.stub();
    dispatcher = new Dispatcher({
      isComponent: isComponent,
    }, {
      get: getComponent,
    });
  });

  it('should call a Processor', () => {
    const Component = {
      id: 'my-id',
      type: 'Processor',
    };

    getComponent.withArgs('my-id').returns({
      process: sinon.stub().returns('success'),
    });

    const result = dispatcher.handle(Component, {});
    assert.equal(result, 'success');
  });

  it('should call an Accessor', () => {
    const Component = {
      id: 'my-id',
      type: 'Accessor',
    };

    getComponent.withArgs('my-id').returns({
      access: sinon.stub().returns('success'),
    });

    const result = dispatcher.handle(Component, {});
    assert.equal(result, 'success');
  });

  it('should fail for other components', () => {
    const Component = {
      id: 'my-id',
      type: 'Behavior',
    };

    assert.throws(
      () => dispatcher.handle(Component, {}),
      (err) =>
        err.message === `unable to handle signal: Component must be Accessor or Processor but is Behavior`);
  });

  it('should fail for invalid component', () => {
    class NoComponent {
    }

    isComponent.returns(false);

    assert.throws(
      () => dispatcher.handle(NoComponent, {}),
      (err) =>
        err.message === `unable to handle signal: invalid Component 'NoComponent'`);
  });

  it('should fail for unknown component', () => {
    const Component = {
      id: 'my-id',
      type: 'Accessor',
    };

    getComponent.withArgs('my-id').throws({ message: 'not found' });

    assert.throws(
      () => dispatcher.handle(Component, {}),
      (err) => err.message === `not found`);
  });
});
