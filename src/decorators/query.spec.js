import assert from 'assert';

import query from './query';
import ComponentUtil from '../component';


describe('Query', () => {
  it('should succeed', () => {
    class Query {
    }

    query('query', 'success')(Query);
    assert.ok(ComponentUtil.isValid(Query));
  });
});
