import assert from 'assert';
import sinon from 'sinon';

import Router from './router';


let router;
let getComponent;

describe('Router', () => {
  beforeEach(() => {
    getComponent = sinon.stub();
    router = new Router({
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

    const { result } = router.handle(MyComponent, {});
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

    const { result } = router.handle(MyComponent, {});
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
      () => router.handle(MyComponent, {}),
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
      () => router.handle(MyComponent, {}),
      (err) => err.message === `not found`);
  });
});
