import path from 'path';

import { Module as HttpModule } from '../http';
import { Module as RouterModule } from '../router';
import { ComponentSchema, Container } from '../container';
import { types, TypeIdentifier } from './types';


async function loadComponents() {
  const initDir = path.dirname(this.opts.module.id);
  return await this.container.init(initDir);
}

async function startModules() {
  const promises = [];
  Object.keys(this.modules).forEach((key) => {
    if (this.modules.hasOwnProperty(key)) {
      promises.push(this.modules[key].start());
    }
  });
  await Promise.all(promises);
}

async function stopModules() {
  const promises = [];
  Object.keys(this.modules).forEach((key) => {
    if (this.modules.hasOwnProperty(key)) {
      promises.push(this.modules[key].stop());
    }
  });
  await Promise.all(promises);
}


class Boot {

  constructor(opts) {
    this.opts = opts;
    this.modules = {
      http: new HttpModule(),
      router: new RouterModule(),
    };

    const schema = new ComponentSchema(types, new TypeIdentifier());
    this.container = new Container(schema);
  }

  async init() {
    await this::loadComponents();
    await this::startModules();
  }

  async dispatch(...args) {
    return this.modules.router.dispatch(...args);
  }

  async terminate() {
    await this::stopModules();
  }
}


export default Boot;
