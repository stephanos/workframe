import assert from 'assert';
import sinon from 'sinon';

import Dispatcher from './dispatcher';


let dispatcher;
let getComponent;

describe('Dispatcher', () => {
  beforeEach(() => {
    getComponent = sinon.stub();
    dispatcher = new Dispatcher({
      get: getComponent,
    });
  });

  it('should call a Processor', () => {
    class MyComponent {
      static __meta = {
        type: {
          typeName: 'Processor',
        },
      };

      process() {
        return 'success';
      }
    }

    getComponent.returns(new MyComponent());

    const result = dispatcher.handle(MyComponent, {});
    assert.equal(result, 'success');
  });

  it('should call an Accessor', () => {
    class MyComponent {
      static __meta = {
        type: {
          typeName: 'Accessor',
        },
      };

      access() {
        return 'success';
      }
    }

    getComponent.returns(new MyComponent());

    const result = dispatcher.handle(MyComponent, {});
    assert.equal(result, 'success');
  });

  it('should fail for invalid component type', () => {
    class MyComponent {
      static __meta = {
        type: {
          typeName: 'Behavior',
        },
      };
    }

    assert.throws(
      () => dispatcher.handle(MyComponent, {}),
      (err) =>
        err.message === `unable to handle signal: Component must be 'Accessor' or 'Processor' but is 'Behavior'`);
  });

  it('should fail for unknown component', () => {
    class MyComponent {
      static __meta = {
        type: {
          typeName: 'Processor',
        },
      };
    }

    getComponent.throws(new Error('not found'));

    assert.throws(
      () => dispatcher.handle(MyComponent, {}),
      (err) => err.message === `not found`);
  });
});
