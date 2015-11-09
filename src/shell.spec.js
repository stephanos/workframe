import assert from 'assert';
import shell from './shell';


describe('Shell', () => {
  it('has suffix', () => {
    class Invalid {
    }

    assert.throws(
      () => shell('test:name')(Invalid),
      (err) => err.message === `class must have suffix 'Shell'`);
  });

  it('has a "process" method', () => {
    class Shell {
    }

    assert.throws(
      () => shell('test:process')(Shell),
      (err) => err.message === `method 'process' must be defined`);
  });

  it('has a "process" method with 1 parameter', () => {
    class Shell {
      process() {
      }
    }

    assert.throws(
      () => shell('test:process:param')(Shell),
      (err) => err.message === `method 'process' must have exactly 1 parameter`);
  });

  it('not have a "id" getter already', () => {
    class Shell {

      get id() {
        return 'my-id';
      }

      process(signal) {
        this.signal = signal;
      }
    }

    assert.throws(
      () => shell('test:process:id:conflict')(Shell),
      (err) => err.message === `getter/property 'id' must not be defined`);
  });

  it('returns its id', () => {
    class Shell {

      process(signal) {
        this.signal = signal;
      }
    }

    shell('test:process:id')(Shell);
    assert.equal(new Shell().id, 'test:process:id');
  });

  it('not have a "namespace" getter already', () => {
    class Shell {

      get namespace() {
        return 'my-namspace';
      }

      process(signal) {
        this.signal = signal;
      }
    }

    assert.throws(
      () => shell('test:process:namespace:conflict')(Shell),
      (err) => err.message === `getter/property 'namespace' must not be defined`);
  });

  it('returns its namespace', () => {
    class Shell {

      process(signal) {
        this.signal = signal;
      }
    }

    shell('my-namspace', 'test:process:namespace')(Shell);
    assert.equal(new Shell().namespace, 'my-namspace');
  });

  it('returns a default namespace if none was specified', () => {
    class Shell {

      process(signal) {
        this.signal = signal;
      }
    }

    shell('test:process:namespace:default')(Shell);
    assert.equal(new Shell().namespace, 'default');
  });

  it('not have a "type" getter already', () => {
    class Shell {

      get type() {
        return 'my-type';
      }

      process(signal) {
        this.signal = signal;
      }
    }

    assert.throws(
      () => shell('test:process:type:conflict')(Shell),
      (err) => err.message === `getter/property 'type' must not be defined`);
  });

  it('returns its type', () => {
    class Shell {

      process(signal) {
        this.signal = signal;
      }
    }

    shell('test:process:type')(Shell);
    assert.equal(new Shell().type, 'SHELL');
  });
});
