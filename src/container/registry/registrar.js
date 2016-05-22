class Registrar {

  constructor(network) {
    this.network = network;
  }

  register(component) {
    component.connections.forEach((connection) => {
      this.network.connect(connection.from, connection.to, connection.relation);
    });
  }
}


export default Registrar;
