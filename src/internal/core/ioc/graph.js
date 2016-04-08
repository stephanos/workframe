import { alg, Graph as Network } from 'graphlib';


class Graph {
  valueById = {};
  networkbyRelation = {};

  get size() {
    return Object.keys(this.valueById).length;
  }

  add(id, value) {
    this.valueById[id] = value;
  }

  get(id) {
    return this.valueById[id];
  }

  connect(from, to, relation) {
    this._getOrCreateNetwork(relation)
      .setEdge(from, to);
  }

  connectionsTo(id, relation) {
    return this._getOrCreateNetwork(relation)
      .outEdges(id)
      .map((edge) => edge.w)
      .map((node) => this.valueById[node]);
  }

  cycles(relation) {
    return alg.findCycles(this._getOrCreateNetwork(relation))
      .map((cycle) => cycle.map((node) => this.valueById[node]));
  }

  _getOrCreateNetwork(relation) {
    if (this.networkbyRelation[relation] === undefined) {
      this.networkbyRelation[relation] = new Network();
    }
    return this.networkbyRelation[relation];
  }
}


export default Graph;
