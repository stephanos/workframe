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
      getConnections: sinon.stub(),
    });
  });

  it('should register components in network', () => {
    registrar.componentSchema.getConnections.withArgs(A).returns([{
      from: A, to: B, relation: 'depends',
    }]);
    registrar.componentSchema.getConnections.withArgs(B).returns([]);

    registrar.registerAll([A, B]);

    registrar.network.connect.calledWith(A, B, 'depends');
  });
});
