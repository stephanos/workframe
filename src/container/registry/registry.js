import Factory from './factory';
import Network from './network';
import Scanner from './scanner';
import Registrar from './registrar';
import ComponentFactory from '../component2/factory';


class Registry {

  constructor(componentSchema) {
    this.network = new Network();
    this.factory = new Factory(this.network);

    const isComponent = (obj) => componentSchema.isComponent(obj);
    const excludeFiles = (path) => /.\.spec.js$/.test(path); // TODO: make configurable
    const scanner = new Scanner(isComponent, excludeFiles);
    const componentFactory = new ComponentFactory(componentSchema);
    this.registrar = new Registrar(this.network, scanner, componentFactory);
  }

  init(module) {
    this.registrar.register(module);
  }

  start() {
    // TODO
  }
}


export default Registry;
