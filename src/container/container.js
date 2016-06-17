import { init, start, stop } from './lifecycle';
import { Clock, IdGenerator } from '../util';
import Dispatcher from './dispatcher';
import Journal from './journal';
import Registry from './registry';
import Status from './status';


class Container {

  constructor(rootDir, componentSchema, parent) {
    this.rootDir = rootDir;
    this.componentSchema = componentSchema;
    this.parent = parent;

    this.registry = new Registry(parent ? parent.registry : undefined);
    this.dispatcher = new Dispatcher(undefined, new Journal(), IdGenerator, Clock);

    this.status = Status.IDLE;
    this.children = [];
  }

  async init() {
    await init(this);
  }

  async start() {
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

  createComponent(component) {
    function create(container) {
      if (container.registry.has(component)) {
        return container.registry.create(component);
      }

      for (const child of container.children) {
        const result = create(child);
        if (result) {
          return result;
        }
      }

      throw new Error(`unable to create '${component.factory.name}': not found`);
    }

    return create(this);
  }

  get components() {
    const collect = (container) => {
      const result = [];
      result.push(...container.registry.components);
      container.children.forEach((child) => result.push(...collect(child)));
      return result;
    };
    return collect(this);
  }
}


export default Container;
