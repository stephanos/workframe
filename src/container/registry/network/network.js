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
    return this.connectionsOf(value, relation, true);
  }

  connectionsFrom(value, relation) {
    return this.connectionsOf(value, relation, false);
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

  connectionsOf(value, relation, incoming) {
    const valueId = this.idByValue[value];
    if (!valueId) {
      throw Error('unknown node');
    }

    const network = this.networkbyRelation[relation];
    if (!network) {
      throw Error('unknown relation');
    }

    const edges = (incoming ? network.inEdges(valueId) : network.outEdges(valueId)) || [];
    return edges
      .map((edge) => edge[incoming ? 'v' : 'w'])
      .map((fromId) => this.valueById[fromId]);
  }
}


export default Network;
