import assert from 'assert';
import sinon from 'sinon';

import MutatorFactory from './mutator';


let factory;
let componentFactory;

describe('MutatorFactory', () => {
  beforeEach(() => {
    componentFactory = sinon.spy();
    factory = new MutatorFactory({
      build: componentFactory,
    });
  });

  it('should delegate to ComponentFactory', () => {
    class Mutator {
    }

    factory.build(Mutator, 'mutatorNS', 'build');

    assert.deepEqual(componentFactory.getCall(0).args[1], {
      injectTypeWhitelist: ['Query'],
      namespace: 'mutatorNS',
      type: 'Mutator',
      id: 'build',
    });
  });
});
