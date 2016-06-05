import path from 'path';

import { ComponentSchema, Container } from '../container';
import { types, TypeIdentifier } from './types';


function createRootContainer() {
  class ServiceComponentType {}
  const schema = new ComponentSchema(
    [ServiceComponentType],
    { test: () => ServiceComponentType });
  const rootDir = path.join(__dirname, '..');
  this.rootContainer = new Container(rootDir, schema);
}

function createUserContainer() {
  const schema = new ComponentSchema(types, new TypeIdentifier());
  const rootDir = path.dirname(this.opts.module.id);
  this.userContainer = this.rootContainer.fork(rootDir, schema);
}


class Application {

  constructor(opts) {
    this.opts = opts;
    this::createRootContainer();
    this::createUserContainer();
    process.rootContainer = this.rootContainer;
  }

  async start() {
    await this.rootContainer.start();
  }

  async dispatch(...args) {
    return this.modules.router.dispatch(...args);
  }

  async stop() {
    await this.rootContainer.stop();
  }
}


export default Application;
