import Factory from './factory';
import Network from './network';
import Registrar from './registrar';


class Registry {

  constructor() {
    this.network = new Network();
    this.factory = new Factory(this.network);
    this.registrar = new Registrar(this.network);
  }

  add(component) {
    this.registrar.register(component);
  }

  get(component) {
    this.factory.create(component);
  }
}


export default Registry;
