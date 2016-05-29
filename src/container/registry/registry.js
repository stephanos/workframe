import Factory from './factory';
import Network from './network';
import Registrar from './registrar';
import Transitioner from './transitioner';


class Registry {

  constructor() {
    this.network = new Network();
    this.factory = new Factory(this.network);
    this.registrar = new Registrar(this.network);
    this.transitioner = new Transitioner(this.network, this.factory);
  }

  add(component) {
    this.registrar.register(component);
  }

  create(type) {
    this.factory.create(type);
  }

  async transitionTo(state) {
    await this.transitioner.to(state);
  }
}


export default Registry;
