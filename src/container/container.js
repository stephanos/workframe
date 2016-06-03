import { load, start, stop } from './lifecycle';
import Registry from './registry';
import Status from './status';


class Container {

  constructor(rootDir, componentSchema, parent) {
    this.rootDir = rootDir;
    this.componentSchema = componentSchema;
    this.parent = parent;

    this.registry = new Registry(parent ? parent.registry : undefined);
    this.status = Status.IDLE;
    this.children = [];
  }

  async start() {
    load(this);
    await start(this);
  }

  async stop() {
    await stop(this);
  }

  fork(rootDir, componentSchema = this.componentSchema) {
    const forked = new Container(rootDir, componentSchema, this);
    this.children.push(forked);
    return forked;
  }

  updateStatus(newStatus) {
    if (!newStatus) {
      throw Error(`invalid status "${newStatus}"`);
    }
    this.status = newStatus;
  }
}


export default Container;
