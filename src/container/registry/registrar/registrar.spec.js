import sinon from 'sinon';

import Registrar from './registrar';


class A {}
class B {}
let registrar;

describe('Registrar', () => {
  beforeEach(() => {
    registrar = new Registrar({
      connect: sinon.spy(),
    }, {
      scan: sinon.stub(),
    }, {
      create: sinon.stub(),
    });
  });

  it('should register components in network', () => {
    const module = {};
    const object = {};
    registrar.scanner.scan.withArgs(module).returns([object]);
    registrar.componentFactory.create.withArgs(object).returns(
      { connections: [{ from: A, to: B, relation: 'depends' }] }
    );
    registrar.register(module);

    registrar.network.connect.calledWith(A, B, 'depends');
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
