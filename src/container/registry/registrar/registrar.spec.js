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
});
