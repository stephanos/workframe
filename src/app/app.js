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
  this.userContainer = this.rootContainer.fork(this.rootDir, schema);
}


class Application {

  status;

  constructor(module, opts) {
    this.rootDir = path.dirname(module.id);
    this.opts = opts;

    this::createRootContainer();
    this::createUserContainer();
    process.rootContainer = this.rootContainer;
  }

  async init() {
    await this.rootContainer.load();
    await this.rootContainer.init();
  }

  async start() {
    await this.rootContainer.start();
  }

  async stop() {
    await this.rootContainer.stop();
  }
}


export default Application;
