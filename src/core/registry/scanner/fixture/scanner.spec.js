import assert from 'assert';
import B, { A } from './abc';
import Z, { X, Y } from './xyz';

import Scanner from '../';


describe('Scanner', () => {
  it('should return all exported objects', () => {
    const result = new Scanner(
      () => true,
      () => false
    ).scan(module);

    assert.deepEqual(result, [A, B, X, Y, Z]);
  });

  it('should return exported objects from files that are not called "abc.js"', () => {
    const result = new Scanner(
      () => true,
      (path) => /abc.js$/.test(path)
    ).scan(module);

    assert.deepEqual(result, [X, Y, Z]);
  });

  it('should return exported objects that are strings', () => {
    const result = new Scanner(
      (obj) => typeof obj === 'string',
      () => false,
    ).scan(module);

    assert.deepEqual(result, [A, Z]);
  });
});
