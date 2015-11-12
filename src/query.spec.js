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
});
