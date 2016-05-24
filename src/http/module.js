import Router from './router';
import Server from './server';


class Module {

  constructor() {
    this.router = new Router();
    this.server = new Server(this.router);
  }

  async init() {
    // TODO
  }

  async start() {
    // TODO
  }

  async stop() {
    // TODO
  }
}


export default Module;
