import Factory from './factory';
import Network from './network';
import Registrar from './registrar';
import Transitioner from './transitioner';


class Registry {

  constructor(parent) {
    this.network = new Network();
    this.registrar = new Registrar(this.network);
    this.factory = new Factory(this.network, parent ? parent.factory : undefined);
    this.transitioner = new Transitioner(this.network, this.factory);
  }

  add(component) {
    this.registrar.register(component);
  }

  create(type) {
    this.factory.create(type);
  }

  async start() {
    await this.transitioner.start();
  }

  async stop() {
    await this.transitioner.stop();
  }
}


export default Registry;
