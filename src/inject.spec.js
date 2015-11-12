import assert from 'assert';

import inject from './inject';


describe('inject', () => {
  class Dependency {
    static id = 'dep-id';
    static type = 'dep-type';
    static namespace = 'dep-ns';
  }

  it('should add dependency', () => {
    class Component {
      static id = 'comp-id';
      static type = 'comp-type';
      static namespace = 'comp-ns';

      dependency = undefined;
    }

    inject(Dependency)(Component, 'dependency');
    assert.deepEqual(Component.prototype.dependencies,
      { 'dependency': {
        id: 'dep-id',
        type: 'dep-type',
        namespace: 'dep-ns',
      }}
    );
  });

  it('should fail when a reference is not a class ', () => {
    class Component {
      static id = 'my-id';
      static type = 'my-type';
      static namespace = 'my-ns';
    }

    assert.throws(
      () => inject('nonsense')(Component, 'dependency'),
      (err) => err.message === `unable to inject 'nonsense' into 'dependency' of 'my-id': not a function`);
  });

  it('should fail when a dependency is already specified', () => {
    class Component {
      static id = 'my-id';
      static type = 'my-type';
      static namespace = 'my-ns';

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
        static id = 'my-id';
        static namespace = 'my-ns';
      }

      assert.throws(
        () => inject(Dependency)(InvalidComponent, 'dependency'),
        (err) => err.message === `unable to inject into any property of 'InvalidComponent': not a component`);
    });

    it('because of missing "id"', () => {
      class InvalidComponent {
        static type = 'my-type';
        static namespace = 'my-ns';
      }

      assert.throws(
        () => inject(Dependency)(InvalidComponent, 'dependency'),
        (err) => err.message === `unable to inject into any property of 'InvalidComponent': not a component`);
    });

    it('because of missing "namespace"', () => {
      class InvalidComponent {
        static id = 'my-id';
        static type = 'my-type';
      }

      assert.throws(
        () => inject(Dependency)(InvalidComponent, 'dependency'),
        (err) => err.message === `unable to inject into any property of 'InvalidComponent': not a component`);
    });
  });
});
