import path from 'path';

import { Module as EventSourceModule } from '../eventsource';
import { Module as HttpModule } from '../http';
import { Module as RouterModule } from '../router';
import { ComponentSchema, Container } from '../container';
import { types, TypeIdentifier } from './types';


async function loadComponents() {
  const initDir = path.dirname(this.opts.module.id);
  return await this.container.init(initDir);
}

async function invokeModulePhase(mode) {
  const promises = [];
  Object.keys(this.modules).forEach((key) => {
    if (this.modules.hasOwnProperty(key)) {
      promises.push(this.modules[key][mode]());
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
      eventsource: new EventSourceModule(),
    };

    const schema = new ComponentSchema(types, new TypeIdentifier());
    this.container = new Container(schema);
  }

  async init() {
    await this::loadComponents();
    await this::invokeModulePhase('init');
    await this::invokeModulePhase('start');
  }

  async dispatch(...args) {
    return this.modules.router.dispatch(...args);
  }

  async terminate() {
    await this::invokeModulePhase('stop');
  }
}


export default Boot;
