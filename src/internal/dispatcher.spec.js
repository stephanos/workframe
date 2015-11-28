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
      get: getComponent,
    }, {
      isComponent: isComponent,
    });
  });

  it('should call a Processor', () => {
    const Component = {
      _namespace: 'ns',
      _name: 'my-name',
      _type: 'Processor',
    };

    getComponent
      .withArgs({ namespace: 'ns', name: 'my-name', type: 'Processor' })
      .returns({ process: sinon.stub().returns('success') });

    const result = dispatcher.handle(Component, {});
    assert.equal(result, 'success');
  });

  it('should call an Accessor', () => {
    const Component = {
      _namespace: 'ns',
      _name: 'my-name',
      _type: 'Accessor',
    };

    getComponent
      .withArgs({ namespace: 'ns', name: 'my-name', type: 'Accessor' })
      .returns({ access: sinon.stub().returns('success') });

    const result = dispatcher.handle(Component, {});
    assert.equal(result, 'success');
  });

  it('should fail for other components', () => {
    const Component = {
      _namespace: 'ns',
      _name: 'my-name',
      _type: 'Behavior',
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
      _namespace: 'ns',
      _name: 'my-name',
      _type: 'Accessor',
    };

    getComponent
      .withArgs({ namespace: 'ns', name: 'my-name', type: 'Accessor' })
      .returns({ access: sinon.stub().throws({ message: 'not found' }) });

    assert.throws(
      () => dispatcher.handle(Component, {}),
      (err) => err.message === `not found`);
  });
});
