class Component {

  constructor(id, type, factory, connections) {
    this.id = id;
    this.type = type;
    this.factory = factory;
    this.connections = connections;
  }

  newInstance() {
    return new this.factory();
  }
}


export default Component;
