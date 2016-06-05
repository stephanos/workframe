import assert from 'assert';
import sinon from 'sinon';

import Inject from './decorator';
import Registrar from './registrar';


class A {}
class B {}
let registrar;

describe('Registrar', () => {
  beforeEach(() => {
    registrar = new Registrar({
      add: sinon.spy(),
      connect: sinon.spy(),
    });
  });

  it('should register component in network', () => {
    registrar.register({
      factory: A, decorations: [],
    });

    assert(registrar.network.add.calledWith(A));
  });

  it('should register component dependencies in network', () => {
    registrar.register({
      factory: A,
      decorations: [{
        type: Inject,
        parameters: [B],
        target: { kind: 'field', name: 'dependency' },
      }],
    });

    assert(registrar.network.add.calledWith(A));
    assert(registrar.network.connect.calledWith(A, B, 'dependsOn', { fieldName: 'dependency' }));
  });

  // it('should fail for missing component', () => {
  //   assert.throws(
  //     () => registry.get(myComponent),
  //     (err) => err.message === 'unable to resolve \'MyComponent\': not found');
  // });
  //
  // it('should fail for missing direct dependency', () => {
  //   myComponent.dependencies = { dependencyA: componentA };
  //
  //   registry.add(myComponent);
  //
  //   assert.throws(
  //     () => registry.get(myComponent),
  //     (err) => err.message === 'unable to resolve \'ComponentA\': not found (trace: \'MyComponent\')');
  // });
  //
  // it('should fail for missing transitive dependency', () => {
  //   myComponent.dependencies = { dependencyB: componentB };
  //
  //   registry.add(componentB);
  //   registry.add(myComponent);
  //
  //   assert.throws(
  //     () => registry.get(myComponent),
  //     (err) => err.message === 'unable to resolve \'ComponentA\': not found (trace: \'MyComponent\' -> \'ComponentB\')');
  // });
  //
  // it('should fail for circular dependency', () => {
  //   myComponent.dependencies = { dependencyB: componentB };
  //   componentB.dependencies = { dependencyA: componentA };
  //   componentA.dependencies = { dependencyB: componentB };
  //
  //   registry.add(componentA);
  //   registry.add(componentB);
  //   registry.add(myComponent);
  //
  //   assert.throws(
  //     () => registry.get(myComponent),
  //     (err) => err.message === 'unable to resolve \'ComponentB\': circular dependency \'MyComponent\' -> \'ComponentB\' -> \'ComponentA\' -> \'ComponentB\'');
  // });
});
