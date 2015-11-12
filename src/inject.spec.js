import assert from 'assert';

import inject from './inject';


describe('inject', () => {
  class Dependency {
    static id = 'depId';
    static type = 'Behavior';
    static namespace = 'ns';
  }

  it('should add dependency', () => {
    class Component {
      static id = 'id';
      static type = 'Shell';
      static namespace = 'ns';

      dependency = undefined;
    }

    inject(Dependency)(Component, 'dependency');
    assert.deepEqual(Component.prototype.dependencies,
      { 'dependency': {
        id: 'depId',
        type: 'Behavior',
        namespace: 'ns',
      }}
    );
  });

  it('should fail when a reference is not a class ', () => {
    class Component {
      static id = 'id';
      static type = 'Behavior';
      static namespace = 'ns';
    }

    assert.throws(
      () => inject('nonsense')(Component, 'dependency'),
      (err) => err.message === `unable to inject 'nonsense' into 'dependency' of 'id': not a function`);
  });

  it('should fail when a dependency is already specified', () => {
    class Component {
      static id = 'id';
      static type = 'Behavior';
      static namespace = 'ns';

      dependency = undefined;
    }

    inject(Dependency)(Component, 'dependency');
    assert.throws(
      () => inject(Dependency)(Component, 'dependency'),
      (err) => err.message === `unable to inject into 'Component': conflicting dependency`);
  });

  describe('should fail when target is not a component', () => {
    it('because of missing "type"', () => {
      class InvalidComponent {
        static id = 'id';
        static namespace = 'ns';
      }

      assert.throws(
        () => inject(Dependency)(InvalidComponent, 'dependency'),
        (err) => err.message === `unable to inject into any property of 'InvalidComponent': not a component`);
    });

    it('because of missing "id"', () => {
      class InvalidComponent {
        static type = 'Behavior';
        static namespace = 'ns';
      }

      assert.throws(
        () => inject(Dependency)(InvalidComponent, 'dependency'),
        (err) => err.message === `unable to inject into any property of 'InvalidComponent': not a component`);
    });

    it('because of missing "namespace"', () => {
      class InvalidComponent {
        static id = 'id';
        static type = 'Behavior';
      }

      assert.throws(
        () => inject(Dependency)(InvalidComponent, 'dependency'),
        (err) => err.message === `unable to inject into any property of 'InvalidComponent': not a component`);
    });
  });
});
