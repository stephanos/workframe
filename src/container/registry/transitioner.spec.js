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

  it('should transition components to "started"', async () => {
    const started = [];
    class A { async start() { started.push(A); } }
    class B { async start() { started.push(B); } }
    class C { async start() { started.push(C); } }
    class D { async start() { started.push(D); } }
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

    await transitioner.start();

    assert.deepEqual(started, [C, D, B, A]);
  });

  it('should transition components to "stopped"', async () => {
    const stopped = [];
    class A { async stop() { stopped.push(A); } }
    class B { async stop() { stopped.push(B); } }
    class C { async stop() { stopped.push(C); } }
    class D { async stop() { stopped.push(D); } }
    transitioner.network.values = [D, C, A, B];
    transitioner.network.connectionsTo = (value) => {
      if (value === A) {
        return [];
      } else if (value === B) {
        return [{ from: A, to: B }];
      } else if (value === C) {
        return [{ from: B, to: C }, { from: D, to: C }];
      } else if (value === D) {
        return [];
      }
      return null;
    };

    await transitioner.stop();

    assert.deepEqual(stopped, [D, A, B, C]);
  });
});
