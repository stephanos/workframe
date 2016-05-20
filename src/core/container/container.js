import Factory from './factory';
import Network from './network';
import Scanner from './scanner';
import Registrar from './registrar';


class Container {

  constructor(componentFactory) {
    this.network = new Network();
    this.factory = new Factory(this.network);

    const isComponent = (obj) => componentFactory.isComponent(obj);
    const excludeFiles = (path) => /.\.spec.js$/.test(path); // TODO: make configurable
    const scanner = new Scanner(isComponent, excludeFiles);
    this.registrar = new Registrar(this.network, scanner, componentFactory);
  }

  init(module) {
    this.registrar.register(module);
  }

  start() {
    // TODO
  }
}


export default Container;
