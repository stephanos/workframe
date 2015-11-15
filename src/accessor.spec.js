import assert from 'assert';
import sinon from 'sinon';

import AccessorFactory from './accessor';


let factory;
let componentFactory;

describe('AccessorFactory', () => {
  beforeEach(() => {
    componentFactory = sinon.spy();
    factory = new AccessorFactory({
      build: componentFactory,
    });
  });

  it('should delegate to ComponentFactory', () => {
    class Accessor {
      access(signal) {
        this.signal = signal;
      }
    }

    factory.build(Accessor, 'accessorNS', 'build');

    assert.deepEqual(componentFactory.getCall(0).args[1], {
      injectTypeWhitelist: ['Accessor', 'Behavior', 'Command', 'Query'],
      namespace: 'accessorNS',
      type: 'Accessor',
      id: 'build',
    });
  });

  it('should fail if "access" method missing', () => {
    class Accessor {
    }

    assert.throws(
      () => factory.build(Accessor, 'accessorNS', undefined),
      (err) => err.message === `method 'access' must be defined`);
  });

  it('should fail if "accessor" method has less than 1 parameter', () => {
    class Accessor {
      access() {
      }
    }

    assert.throws(
      () => factory.build(Accessor, 'accessorNS', undefined),
      (err) => err.message === `method 'access' must have exactly 1 parameter`);
  });

  it('should fail if "accessor" method has more than 1 parameter', () => {
    class Accessor {
      access(one, two) {
        this.one = one;
        this.two = two;
      }
    }

    assert.throws(
      () => factory.build(Accessor, 'accessorNS', undefined),
      (err) => err.message === `method 'access' must have exactly 1 parameter`);
  });
});
