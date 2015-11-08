import assert from 'assert';
import inject from './inject';


describe('inject', () => {
  it('should add dependency by string', () => {
    class Component {
      static id = 'my-id';
      static type = 'my-type';

      dependency = undefined;
    }

    inject('test:dependency')(Component, 'dependency');
    assert.deepEqual(Component.prototype.dependencies,
      { 'dependency': 'test:dependency' }
    );
  });

  it('should add dependency by reference', () => {
    class Dependency {
      static id = 'test:dependency';
      static type = 'my-type';
    }

    class Component {
      static id = 'my-id';
      static type = 'my-type';

      dependency = undefined;
    }

    inject(Dependency)(Component, 'dependency');
    assert.deepEqual(Component.prototype.dependencies,
      { 'dependency': 'test:dependency' }
    );
  });

  it('should fail when target is not a component', () => {
    class ComponentWithoutType {
      static id = 'my-id';
    }

    assert.throws(
      () => inject('test:dependency')(ComponentWithoutType, 'dependency'),
      (err) => err.message === `unable to inject into property of 'ComponentWithoutType': not a component`);


    class ComponentWithoutID {
      static type = 'my-type';
    }

    assert.throws(
      () => inject('test:dependency')(ComponentWithoutID, 'dependency'),
      (err) => err.message === `unable to inject into property of 'ComponentWithoutID': not a component`);
  });

  it('should fail when a dependency is already specified', () => {
    class Component {
      static id = 'my-id';
      static type = 'my-type';

      dependency = undefined;
    }

    inject('test:dependencyA')(Component, 'dependency');
    assert.throws(
      () => inject('test:dependencyB')(Component, 'dependency'),
      (err) => err.message === `unable to inject into 'Component': conflicting dependency`);
  });
});
