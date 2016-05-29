import UUID from 'node-uuid';
import { alg, Graph } from 'graphlib';


class Network {
  idByValue = {};
  valueById = {};
  networkByRelation = {};


  connect(from, to, relation, props) {
    const fromId = this.getOrAdd(from);
    const toId = this.getOrAdd(to);
    this.getOrCreateNetwork(relation).setEdge(fromId, toId, props);
  }

  connectionsTo(value, relation) {
    return this.connectionsOf(value, relation, true);
  }

  connectionsFrom(value, relation) {
    return this.connectionsOf(value, relation, false);
  }

  cycles(relation) {
    const network = this.networkByRelation[relation];
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
    if (this.networkByRelation[relation] === undefined) {
      this.networkByRelation[relation] = new Graph();
    }

    return this.networkByRelation[relation];
  }

  get values() {
    return Object.values(this.valueById);
  }

  connectionsOf(value, relation, incoming) {
    const valueNodeId = this.idByValue[value];
    if (!valueNodeId) {
      throw Error('unknown value');
    }

    const network = this.networkByRelation[relation];
    if (!network) {
      throw Error('unknown relation');
    }

    const edges = network[incoming ? 'inEdges' : 'outEdges'](valueNodeId) || [];
    return edges
      .map((edge) => {
        const connection = {};
        const connectedNodeId = edge[incoming ? 'v' : 'w'];
        connection[incoming ? 'from' : 'to'] = this.valueById[connectedNodeId];
        const props = network.edge(connectedNodeId, valueNodeId)
          || network.edge(valueNodeId, connectedNodeId);
        if (props) {
          connection.props = props;
        }
        return connection;
      });
  }
}


export default Network;
