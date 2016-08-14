import assert from 'assert';

import Network from './network';


describe('Network', () => {
  class Adam {}
  class Eve {}
  class Snake {}

  it('should add a value', () => {
    const net = new Network();
    net.add(Adam);

    assert.deepEqual(net.nodes, [Adam]);
  });

  it('should connect two values', () => {
    const net = new Network();
    net.connect(Adam, Eve);

    assert.deepEqual(net.connectionsTo(Eve), [{ from: Adam }]);
    assert.deepEqual(net.connectionsFrom(Adam), [{ to: Eve }]);
    assert.deepEqual(net.nodes, [Adam, Eve]);
  });

  it('should connect three values', () => {
    const net = new Network();
    net.connect(Adam, Eve);
    net.connect(Snake, Adam);

    assert.deepEqual(net.connectionsTo(Eve), [{ from: Adam }]);
    assert.deepEqual(net.connectionsTo(Adam), [{ from: Snake }]);
    assert.deepEqual(net.connectionsFrom(Adam), [{ to: Eve }]);
    assert.deepEqual(net.nodes, [Adam, Eve, Snake]);
  });

  it('should connect two values with properties', () => {
    const net = new Network();
    net.connect(Adam, Eve, { how: 'very much' });

    assert.deepEqual(net.connectionsTo(Eve),
      [{ from: Adam, props: { how: 'very much' } }]);
    assert.deepEqual(net.connectionsFrom(Adam),
      [{ to: Eve, props: { how: 'very much' } }]);
  });

  it('should fail to return connections to non-existing node', () => {
    const net = new Network();
    net.connect(Adam, Eve);

    assert.throws(() => net.connectionsTo(Snake));
    assert.throws(() => net.connectionsFrom(Snake));
  });

  it('should return whether contains a value', () => {
    const net = new Network();
    net.connect(Adam, Eve);

    assert.ok(net.contains(Adam));
    assert.ok(net.contains(Eve));
    assert.ok(!net.contains(Snake));
  });

  describe('without a cycle', () => {
    it('should return empty cyclic path', () => {
      const net = new Network();
      net.connect(Adam, Eve);

      assert.deepEqual(net.cycles, []);
    });
  });

  describe('with a cycle', () => {
    it('should return path of cycle', () => {
      const net = new Network();
      net.connect(Adam, Eve);
      net.connect(Eve, Adam);

      assert.deepEqual(net.cycles, [[Eve, Adam]]);
    });
  });
});
