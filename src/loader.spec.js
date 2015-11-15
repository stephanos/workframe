import assert from 'assert';

import loader from './loader';
import {isComponent} from './util';


describe('Loader', () => {
  it('should succeed', () => {
    class Loader {
    }

    loader('loader', 'loaderSuccess')(Loader);
    assert.ok(isComponent(Loader));
  });

  it('should not allow any injection', () => {
    class Loader {
    }

    loader('loader', 'loaderInjection')(Loader);
    assert.deepEqual(Loader.injectTypeWhitelist, []);
  });
});
