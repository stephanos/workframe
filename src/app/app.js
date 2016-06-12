import path from 'path';

import { ComponentSchema, Container } from '../container';
import { types, TypeIdentifier } from './types';


function createRootContainer() {
  class ServiceComponentType {
    name = 'Service';
  }
  const typeIdentifier = { test: () => ServiceComponentType };
  const schema = new ComponentSchema([new ServiceComponentType()], typeIdentifier);

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
    await this.rootContainer.init();
    await this.rootContainer.start();
  }

  async stop() {
    await this.rootContainer.stop();
  }
}


export default Application;
