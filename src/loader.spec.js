import assert from 'assert';
import sinon from 'sinon';

import LoaderFactory from './loader';


let factory;
let componentFactory;

describe('LoaderFactory', () => {
  beforeEach(() => {
    componentFactory = sinon.spy();
    factory = new LoaderFactory({
      build: componentFactory,
    });
  });

  it('should delegate to ComponentFactory', () => {
    class Loader {
    }

    factory.build(Loader, 'loaderNS', 'build');

    assert.deepEqual(componentFactory.getCall(0).args[1], {
      injectTypeWhitelist: [],
      namespace: 'loaderNS',
      type: 'Loader',
      id: 'build',
    });
  });
});
