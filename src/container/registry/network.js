import UUID from 'node-uuid';
import { alg, Graph } from 'graphlib';


class Network {
  graph;
  idByValue = {};
  valueById = {};
  propsByValue = {};

  constructor() {
    this.graph = new Graph();
  }

  add(value, props) {
    this.getOrAdd(value);
    this.propsByValue[value] = props;
  }

  connect(from, to, props) {
    const fromId = this.getOrAdd(from);
    const toId = this.getOrAdd(to);
    this.graph.setEdge(fromId, toId, props);
  }

  connectionsTo(value) {
    return this.connectionsOf(value, true);
  }

  connectionsFrom(value) {
    return this.connectionsOf(value, false);
  }

  get cycles() {
    return alg.findCycles(this.graph)
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

  get nodes() {
    return Object.values(this.valueById);
  }

  contains(value) {
    return this.idByValue[value] !== undefined;
  }

  connectionsOf(value, incoming) {
    const valueNodeId = this.idByValue[value];
    if (!valueNodeId) {
      throw Error('unknown value');
    }

    const edges = this.graph[incoming ? 'inEdges' : 'outEdges'](valueNodeId) || [];
    return edges
      .map((edge) => {
        const connection = {};
        const connectedNodeId = edge[incoming ? 'v' : 'w'];
        connection[incoming ? 'from' : 'to'] = this.valueById[connectedNodeId];
        const props = this.graph.edge(connectedNodeId, valueNodeId)
          || this.graph.edge(valueNodeId, connectedNodeId);
        if (props) {
          connection.props = props;
        }
        return connection;
      });
  }
}


export default Network;
