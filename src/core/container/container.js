import Factory from './factory';
import Network from './network';
import Scanner from './scanner';
import Registrar from './registrar';


class Container {

  constructor(componentFactory) {
    const isComponent = (obj) => componentFactory.isComponent(obj);
    const excludeFiles = (path) => /.\.spec.js$/.test(path); // TODO: make configurable
    this.scanner = new Scanner(isComponent, excludeFiles);

    this.network = new Network();
    this.factory = new Factory(this.network);
    this.registrar = new Registrar(this.network, componentFactory);
  }

  init(module) {
    this.scanner.scan(module)
      .map((obj) => this.componentFactory.create(obj))
      .forEach((comp) => this.registrar.register(comp));
  }

  start() {
    // TODO
  }
}


export default Container;
