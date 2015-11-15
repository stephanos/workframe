import assert from 'assert';
import sinon from 'sinon';

import BehaviorFactory from './behavior';


let factory;
let componentFactory;

describe('BehaviorFactory', () => {
  beforeEach(() => {
    componentFactory = sinon.spy();
    factory = new BehaviorFactory({
      build: componentFactory,
    });
  });

  it('should delegate to ComponentFactory', () => {
    class Behavior {
      behave() {
      }
    }

    factory.build(Behavior, 'behaviorNS', 'build');

    assert.deepEqual(componentFactory.getCall(0).args[1], {
      injectTypeWhitelist: [],
      namespace: 'behaviorNS',
      type: 'Behavior',
      id: 'build',
    });
  });

  it('should fail if "behave" method missing', () => {
    class Behavior {
    }

    assert.throws(
      () => factory.build(Behavior, 'behaviorNS', undefined),
      (err) => err.message === `method 'behave' must be defined`);
  });
});
