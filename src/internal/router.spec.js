import assert from 'assert';
import sinon from 'sinon';

import Router from './router';


let router;
let registry;
let cmdHandler;
let qryHandler;

describe('Router', () => {
  beforeEach(() => {
    registry = {
      get: sinon.stub(),
      getConnection: sinon.stub(),
    };
    cmdHandler = {
      handle: sinon.stub(),
    };
    qryHandler = {
      handle: sinon.stub(),
    };
    router = new Router(registry, cmdHandler, qryHandler);
  });

  it('should call a Processor', async () => {
    class MyComponent {
      static __meta = {
        type: {
          typeName: 'Processor',
        },
      };
    }

    registry.getConnection.returns(MyComponent);
    registry.get.returns(new MyComponent());
    cmdHandler.handle.returns('success');

    const { result } = await router.handle({});
    assert.equal(result, 'success');
  });

  it('should call an Accessor', async () => {
    class MyComponent {
      static __meta = {
        type: {
          typeName: 'Accessor',
        },
      };
    }

    registry.getConnection.returns(MyComponent);
    registry.get.returns(new MyComponent());
    qryHandler.handle.returns('success');

    const { result } = await router.handle({});
    assert.equal(result, 'success');
  });

  // it('should fail for unhandled type', async () => {
  //   class MyCommand {
  //   }
  //
  //   assert.throws(
  //     async () => await router.handle(MyCommand),
  //     (err) =>
  //       err.message === `unable to handle signal: no matching handler found for 'MyCommand'`);
  // });
  //
  // it('should fail for invalid component type', () => {
  //   class MyComponent {
  //     static __meta = {
  //       type: {
  //         typeName: 'Behavior',
  //       },
  //     };
  //   }
  //
  //   registry.getConnection.returns(MyComponent);
  //
  //   assert.throws(
  //     async () => await router.handle({}),
  //     (err) =>
  //       err.message === `unable to handle signal: Component must be 'Accessor' or 'Processor' but is 'Behavior'`);
  // });
  //
  // it('should fail for unknown component', async () => {
  //   class MyComponent {
  //     static __meta = {
  //       type: {
  //         typeName: 'Processor',
  //       },
  //     };
  //   }
  //
  //   registry.getConnection.returns(MyComponent);
  //   registry.get.throws(new Error('not found'));
  //
  //   assert.throws(
  //     async () => await router.handle({}),
  //     (err) => err.message === `not found`);
  // });
});
