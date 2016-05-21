class Registrar {

  constructor(network, scanner, componentFactory) {
    this.componentFactory = componentFactory;
    this.network = network;
    this.scanner = scanner;
  }


  register(module) {
    this.scanner.scan(module)
      .map((obj) => this.componentFactory.create(obj))
      .forEach((component) => {
        component.connections.forEach((connection) => {
          this.network.connect(connection.from, connection.to, connection.relation);
        });
      });
  }
}


export default Registrar;
