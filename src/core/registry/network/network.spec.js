import assert from 'assert';

import Network from './';


describe('Network', () => {
  class Adam {}
  class Eve {}
  class Snake {}

  it('should connect 2 new values', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'likes');

    assert.deepEqual(net.connectionsTo(Adam, 'likes'), [Eve]);
  });

  it('should connect new value with existing value', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'likes');
    net.connect(Snake, Eve, 'hates');

    assert.deepEqual(net.connectionsTo(Adam, 'likes'), [Eve]);
    assert.deepEqual(net.connectionsTo(Snake, 'hates'), [Eve]);
  });

  it('should connect existing value with new value', () => {
    const net = new Network();
    net.connect(Snake, Adam, 'hates');
    net.connect(Snake, Eve, 'hates');

    assert.deepEqual(net.connectionsTo(Snake, 'hates'), [Adam, Eve]);
  });

  it('should fail to return connections to non-existing node', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'likes');

    assert.throws(() => net.connectionsTo(Snake, 'likes'));
  });

  it('should fail to return connections for non-existing relation', () => {
    const net = new Network();
    net.connect(Adam, Eve, 'likes');

    assert.throws(() => net.connectionsTo(Adam, 'hates'));
  });

  describe('without a cycle', () => {
    it('should return empty cyclic path', () => {
      const net = new Network();
      net.connect(Adam, Eve, 'likes');

      assert.deepEqual(net.cycles('likes'), []);
    });
  });

  describe('with a cycle', () => {
    it('should return path of cycle', () => {
      const net = new Network();
      net.connect(Adam, Eve, 'likes');
      net.connect(Eve, Adam, 'likes');

      assert.deepEqual(net.cycles('likes'), [[Eve, Adam]]);
    });
  });
});
