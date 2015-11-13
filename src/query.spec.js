import assert from 'assert';

import query from './query';
import {isComponent} from './util';


describe('Query', () => {
  it('should succeed', () => {
    class Query {
    }

    query('query', 'querySuccess')(Query);
    assert.ok(isComponent(Query));
  });

  it('should not allow any injection', () => {
    class Query {
    }

    query('query', 'queryInjection')(Query);
    assert.deepEqual(Query.injectTypeWhitelist, []);
  });
});
