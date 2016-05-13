import { alg, Graph } from 'graphlib';


class Network {
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
    this.getOrCreateNetwork(relation)
      .setEdge(from, to);
  }

  connectionsTo(id, relation) {
    return this.getOrCreateNetwork(relation)
      .outEdges(id)
      .map((edge) => edge.w)
      .map((node) => this.valueById[node]);
  }

  cycles(relation) {
    return alg.findCycles(this.getOrCreateNetwork(relation))
      .map((cycle) => cycle.map((node) => this.valueById[node]));
  }


  getOrCreateNetwork(relation) {
    if (this.networkbyRelation[relation] === undefined) {
      this.networkbyRelation[relation] = new Graph();
    }
    return this.networkbyRelation[relation];
  }
}


export default Network;
