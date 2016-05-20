class Registrar {

  constructor(network, componentSchema) {
    this.network = network;
    this.componentSchema = componentSchema;
  }


  registerAll(components) {
    components.forEach((component) => {
      const connections = this.componentSchema.getConnections(component);
      connections.forEach((connection) => {
        this.network.connect(connection.from, connection.to, connection.relation);
      });
    });
  }
}


export default Registrar;
