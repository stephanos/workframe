import sinon from 'sinon';
import assert from 'assert';

import Factory from './factory';

class A {}
class B {}
class C {}

const compA = { id: 0, factory: A };
const compB = { id: 1, factory: B };
const compC = { id: 2, factory: C };

let factory;

describe('Factory', () => {
  beforeEach(() => {
    factory = new Factory({
      connectionsFrom: sinon.stub(),
    });
  });

  it('should create component that has no dependencies', () => {
    const instance = factory.create(compA);

    assert.ok(instance instanceof A);
  });

  it('should create component with direct dependencies', () => {
    factory.network.connectionsFrom.withArgs(compA, 'dependsOn').returns([
      { to: compB, props: { fieldName: 'depB' } },
      { to: compC, props: { fieldName: 'depC' } },
    ]);

    const instance = factory.create(compA);

    assert.ok(instance instanceof A);
    assert.ok(instance.depB instanceof B);
    assert.ok(instance.depC instanceof C);
  });

  it('should create component with transitive dependencies', () => {
    factory.network.connectionsFrom.withArgs(compA, 'dependsOn').returns([
      { to: compB, props: { fieldName: 'depB' } },
    ]);
    factory.network.connectionsFrom.withArgs(compB, 'dependsOn').returns([
      { to: compC, props: { fieldName: 'depC' } },
    ]);

    const instance = factory.create(compA);

    assert.ok(instance instanceof A);
    assert.ok(instance.depB instanceof B);
    assert.ok(instance.depB.depC instanceof C);
  });

  it('should return same result for same request', () => {
    const instance1 = factory.create(compA);
    const instance2 = factory.create(compA);

    assert.equal(instance1, instance2);
  });

  it('should create each dependency only once', () => {
    factory.network.connectionsFrom.withArgs(compA, 'dependsOn').returns([
      { to: compB, props: { fieldName: 'dep1' } },
      { to: compB, props: { fieldName: 'dep2' } },
    ]);

    const instance = factory.create(compA);

    assert.equal(instance.dep1, instance.dep2);
  });
});
