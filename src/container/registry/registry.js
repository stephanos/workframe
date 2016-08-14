import { OnInit, OnStart, OnStop } from '../lifecycle/decorators';

import Factory from './factory';
import Network from './network';
import Registrar from './registrar';
import Transitioner from './transitioner';


class Registry {

  components = [];

  constructor() {
    const network = new Network();
    this.factory = new Factory(network);
    this.registrar = new Registrar(network);
    this.transitioner = new Transitioner(network, this.factory);
  }

  async init(dispatcher) {
    await this.transitioner.init(dispatcher, OnInit);
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
