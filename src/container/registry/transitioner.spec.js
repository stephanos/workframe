import assert from 'assert';

import Transitioner from './transitioner';


let transitioner;

describe('Transitioner', () => {
  beforeEach(() => {
    const network = {};
    const factory = {
      create: (type) => new type(),
    };
    transitioner = new Transitioner(network, factory);
  });

  it('TODO', async () => {
    const launched = [];
    class A { async launch() { launched.push(A); } }
    class B { async launch() { launched.push(B); } }
    class C { async launch() { launched.push(C); } }
    class D { async launch() { launched.push(D); } }
    transitioner.network.values = [D, C, A, B];
    transitioner.network.connectionsFrom = (value) => {
      if (value === A) {
        return [{ from: A, to: B }];
      } else if (value === B) {
        return [{ from: B, to: C }];
      } else if (value === C) {
        return [];
      } else if (value === D) {
        return [{ from: D, to: C }];
      }
      return null;
    };

    await transitioner.to('launch');

    assert.deepEqual(launched, [C, D, B, A]);
  });
});
