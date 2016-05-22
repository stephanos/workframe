import path from 'path';
import assert from 'assert';
import B, { A } from './fixtures/abc';
import Z, { X, Y } from './fixtures/xyz';

import Scanner from './scanner';


const fixtureDir = path.join(__dirname, 'fixtures');

describe('Scanner', () => {
  it('should return all exported objects', () => {
    const result = new Scanner(
      () => true,
      () => false
    ).scan(fixtureDir);

    assert.deepEqual(result, [A, B, X, Y, Z]);
  });

  it('should return exported objects from files that are not called "abc.js"', () => {
    const result = new Scanner(
      () => true,
      (p) => /abc.js$/.test(p)
    ).scan(fixtureDir);

    assert.deepEqual(result, [X, Y, Z]);
  });

  it('should return exported objects that are strings', () => {
    const result = new Scanner(
      (obj) => typeof obj === 'string',
      () => false,
    ).scan(fixtureDir);

    assert.deepEqual(result, [A, Z]);
  });

  it('should fail for relative path', () => {
    assert.throws(() => new Scanner(() => true, () => false).scan('./relative-path'));
  });
});
