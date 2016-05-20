import UUID from 'node-uuid';
import { alg, Graph } from 'graphlib';


class Network {
  idByValue = {};
  valueById = {};
  networkbyRelation = {};


  connect(from, to, relation) {
    const fromId = this.getOrAdd(from);
    const toId = this.getOrAdd(to);
    this.getOrCreateNetwork(relation).setEdge(fromId, toId);
  }

  connectionsTo(value, relation) {
    const toId = this.idByValue[value];
    if (!toId) {
      throw Error('unknown node');
    }

    const network = this.networkbyRelation[relation];
    if (!network) {
      throw Error('unknown relation');
    }

    return network
      .outEdges(toId)
      .map((edge) => edge.w)
      .map((fromId) => this.valueById[fromId]);
  }

  cycles(relation) {
    const network = this.networkbyRelation[relation];
    if (!network) {
      return [];
    }

    return alg.findCycles(this.getOrCreateNetwork(relation))
      .map((cycle) => cycle.map((node) => this.valueById[node]));
  }


  getOrAdd(value) {
    const existingId = this.idByValue[value];
    if (existingId) {
      return existingId;
    }

    const id = UUID.v1();
    this.valueById[id] = value;
    this.idByValue[value] = id;
    return id;
  }

  getOrCreateNetwork(relation) {
    if (this.networkbyRelation[relation] === undefined) {
      this.networkbyRelation[relation] = new Graph();
    }

    return this.networkbyRelation[relation];
  }
}


export default Network;
