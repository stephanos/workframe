import assert from 'assert';

import shell from './shell';
import {isComponent} from './util';


describe('Shell', () => {
  it('should succeed', () => {
    class Shell {
      process(signal) {
        this.signal = signal;
      }
    }

    shell('shell', 'shell:success')(Shell);
    assert.ok(isComponent(Shell));
  });

  it('should fail if "process" method missing', () => {
    class Shell {
    }

    assert.throws(
      () => shell('shell', 'process')(Shell),
      (err) => err.message === `method 'process' must be defined`);
  });

  it('should fail if "process" method has less than 1 parameter', () => {
    class Shell {
      process() {
      }
    }

    assert.throws(
      () => shell('shell', 'process:param:too-few')(Shell),
      (err) => err.message === `method 'process' must have exactly 1 parameter`);
  });

  it('should fail if "process" method has more than 1 parameter', () => {
    class Shell {
      process(one, two) {
        this.one = one;
        this.two = two;
      }
    }

    assert.throws(
      () => shell('shell', 'process:param:too-many')(Shell),
      (err) => err.message === `method 'process' must have exactly 1 parameter`);
  });
});
