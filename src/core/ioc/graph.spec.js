import assert from 'assert';

import Graph from './graph';


describe('Graph', () => {
  class Adam {}
  class Eve {}
  class Snake {}

  describe('add()', () => {
    it('should add a node', () => {
      const graph = new Graph();
      graph.add('a', Adam);
      assert.equal(graph.get('a'), Adam);
    });
  });

  describe('connect()', () => {
    it('should connect nodes', () => {
      const graph = new Graph();
      graph.add('a', Adam);
      graph.add('e', Eve);
      graph.add('s', Snake);

      graph.connect('a', 'e', 'likes');
      graph.connect('s', 'a', 'hates');
      graph.connect('s', 'e', 'hates');

      assert.deepEqual(graph.connectionsTo('a', 'hates'), []);
      assert.deepEqual(graph.connectionsTo('a', 'likes'), [Eve]);
      assert.deepEqual(graph.connectionsTo('s', 'hates'), [Adam, Eve]);
    });
  });

  describe('cycles()', () => {
    it('should return cyclic paths', () => {
      const graph = new Graph();
      graph.add('a', Adam);
      graph.add('e', Eve);

      graph.connect('a', 'e', 'likes');
      assert.deepEqual(graph.cycles('likes'), []);

      graph.connect('e', 'a', 'likes');
      assert.deepEqual(graph.cycles('likes'), [[Eve, Adam]]);
    });
  });

  describe('size()', () => {
    it('should return 0 after initialization', () => {
      const graph = new Graph();
      assert.equal(graph.size, 0);
    });

    it('should grow with each added node', () => {
      const graph = new Graph();
      graph.add('a', Adam);
      assert.equal(graph.size, 1);
      graph.add('e', Eve);
      assert.equal(graph.size, 2);
    });
  });
});
