import { OnStart, OnStop } from '../lifecycle/decorators';

import Factory from './factory';
import Network from './network';
import Registrar from './registrar';
import Transitioner from './transitioner';


class Registry {

  components = [];

  constructor(parent) {
    this.network = new Network();
    this.registrar = new Registrar(this.network);
    this.factory = new Factory(this.network, parent ? parent.factory : parent);
    this.transitioner = new Transitioner(this.network, this.factory);
  }

  async start(dispatcher) {
    await this.transitioner.start(dispatcher, OnStart);
  }

  async stop(dispatcher) {
    await this.transitioner.stop(dispatcher, OnStop);
  }

  add(component) {
    this.registrar.register(component);
    this.components.push(component);
  }

  has(component) {
    return this.components.includes(component);
  }

  create(component) {
    return this.factory.create(component.factory);
  }
}


export default Registry;
