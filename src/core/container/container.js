import Factory from './factory';
import Network from './network';
import Scanner from './scanner';
import Registrar from './registrar';


class Container {

  constructor(componentSchema) {
    const isComponent = (obj) => componentSchema.isComponent(obj);
    const excludeFiles = (path) => /.\.spec.js$/.test(path); // TODO: make configurable
    this.scanner = new Scanner(isComponent, excludeFiles);

    this.network = new Network();
    this.factory = new Factory(this.network);
    this.registrar = new Registrar(this.network, componentSchema);
  }

  init(module) {
    this.registrar.registerAll(this.scanner.scan(module));
  }

  start() {
    // TODO
  }
}


export default Container;
