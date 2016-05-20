import sinon from 'sinon';

import Registrar from './registrar';


class A {}
class B {}
let registrar;

describe('Registrar', () => {
  beforeEach(() => {
    registrar = new Registrar({
      connect: sinon.spy(),
    });
  });

  it('should register components in network', () => {
    const compA = { connections: [{ from: A, to: B, relation: 'depends' }] };
    registrar.register(compA);

    registrar.network.connect.calledWith(A, B, 'depends');
  });
});
