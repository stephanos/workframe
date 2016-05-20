import assert from 'assert';
import B, { A } from './abc';
import Z, { X, Y } from './xyz';

import scan from '../';


describe('scan', () => {
  it('should return all exported objects', () => {
    const result = scan(module,
      () => true,
      () => false,
    );

    assert.deepEqual(result, [A, B, X, Y, Z]);
  });

  it('should return exported objects from files that are not called "abc.js"', () => {
    const result = scan(module,
      () => true,
      (path) => /abc.js$/.test(path),
    );

    assert.deepEqual(result, [X, Y, Z]);
  });

  it('should return exported objects that are strings', () => {
    const result = scan(module,
      (obj) => typeof obj === 'string',
      () => false,
    );

    assert.deepEqual(result, [A, Z]);
  });
});
