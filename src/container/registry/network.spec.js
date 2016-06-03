import assert from 'assert';

import Network from './network';


describe('Network', () => {
  class Adam {}
  class Eve {}
  class Snake {}

  it('should connect 2 new values', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'like');

    assert.deepEqual(net.connectionsTo(Eve, 'like'), [{ from: Adam }]);
    assert.deepEqual(net.connectionsFrom(Adam, 'like'), [{ to: Eve }]);
  });

  it('should connect 2 values with properties', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'like', { how: 'very much' });

    assert.deepEqual(net.connectionsTo(Eve, 'like'),
      [{ from: Adam, props: { how: 'very much' } }]);
    assert.deepEqual(net.connectionsFrom(Adam, 'like'),
      [{ to: Eve, props: { how: 'very much' } }]);
  });

  it('should connect new value with existing value', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'like');
    net.connect(Snake, Eve, 'hate');

    assert.deepEqual(net.connectionsTo(Eve, 'hate'), [{ from: Snake }]);
    assert.deepEqual(net.connectionsFrom(Eve, 'hate'), []);
    assert.deepEqual(net.connectionsTo(Snake, 'hate'), []);
    assert.deepEqual(net.connectionsFrom(Snake, 'hate'), [{ to: Eve }]);
  });

  it('should connect existing value with new value', () => {
    const net = new Network();
    net.connect(Snake, Adam, 'hate');
    net.connect(Snake, Eve, 'hate');

    assert.deepEqual(net.connectionsTo(Eve, 'hate'), [{ from: Snake }]);
    assert.deepEqual(net.connectionsFrom(Eve, 'hate'), []);
    assert.deepEqual(net.connectionsTo(Adam, 'hate'), [{ from: Snake }]);
    assert.deepEqual(net.connectionsFrom(Snake, 'hate'), [{ to: Adam }, { to: Eve }]);
  });

  it('should fail to return connections to non-existing node', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'like');

    assert.throws(() => net.connectionsTo(Snake, 'like'));
    assert.throws(() => net.connectionsFrom(Snake, 'like'));
  });

  it('should fail to return connections for non-existing relation', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'like');

    assert.throws(() => net.connectionsTo(Adam, 'hate'));
    assert.throws(() => net.connectionsFrom(Adam, 'hate'));
  });

  it('should return whether contains a value', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'like');

    assert.ok(net.contains(Adam));
    assert.ok(net.contains(Eve));
    assert.ok(!net.contains(Snake));
  });

  describe('without a cycle', () => {
    it('should return empty cyclic path', () => {
      const net = new Network();
      net.connect(Adam, Eve, 'like');

      assert.deepEqual(net.cycles('like'), []);
    });
  });

  describe('with a cycle', () => {
    it('should return path of cycle', () => {
      const net = new Network();
      net.connect(Adam, Eve, 'like');
      net.connect(Eve, Adam, 'like');

      assert.deepEqual(net.cycles('like'), [[Eve, Adam]]);
    });
  });
});
