import sinon from 'sinon';
import assert from 'assert';

import Factory from './factory';

class A {}
class B {}
class C {}

let factory;

describe('Factory', () => {
  beforeEach(() => {
    factory = new Factory({
      connectionsFrom: sinon.stub(),
    });
  });

  it('should create component that has no dependencies', () => {
    const instance = factory.create(A);

    assert.ok(instance instanceof A);
  });

  it('should create component with direct dependencies', () => {
    factory.network.connectionsFrom.withArgs(A, 'dependsOn').returns([
      { to: B, props: { fieldName: 'depB' } },
      { to: C, props: { fieldName: 'depC' } },
    ]);

    const instance = factory.create(A);

    assert.ok(instance instanceof A);
    assert.ok(instance.depB instanceof B);
    assert.ok(instance.depC instanceof C);
  });

  it('should create component with transitive dependencies', () => {
    factory.network.connectionsFrom.withArgs(A, 'dependsOn').returns([
      { to: B, props: { fieldName: 'depB' } },
    ]);
    factory.network.connectionsFrom.withArgs(B, 'dependsOn').returns([
      { to: C, props: { fieldName: 'depC' } },
    ]);

    const instance = factory.create(A);

    assert.ok(instance instanceof A);
    assert.ok(instance.depB instanceof B);
    assert.ok(instance.depB.depC instanceof C);
  });

  it('should return same result for same request', () => {
    const instance1 = factory.create(A);
    const instance2 = factory.create(A);

    assert.equal(instance1, instance2);
  });

  it('should create each dependency only once', () => {
    factory.network.connectionsFrom.withArgs(A, 'dependsOn').returns([
      { to: B, props: { fieldName: 'dep1' } },
      { to: B, props: { fieldName: 'dep2' } },
    ]);

    const instance = factory.create(A);

    assert.equal(instance.dep1, instance.dep2);
  });
});
