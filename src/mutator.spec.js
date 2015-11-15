import assert from 'assert';

import mutator from './mutator';
import {isComponent} from './util';


describe('Mutator', () => {
  it('should succeed', () => {
    class Mutator {
    }

    mutator('mutator', 'mutatorSuccess')(Mutator);
    assert.ok(isComponent(Mutator));
  });

  it('should only allow limited injectable types', () => {
    class Mutator {
    }

    mutator('mutator', 'mutatorInjection')(Mutator);
    assert.deepEqual(Mutator.injectTypeWhitelist, ['Query']);
  });
});
