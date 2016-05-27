import ComponentFactory from './component2/factory';

import Registry from './registry';
import Scanner from './scanner';

import { IdGenerator } from '../util';


async function invokeLifecycleMethod(items, mode) {
  const promises = [];
  Object.keys(items).forEach((key) => {
    if (!items.hasOwnProperty(key)) {
      return;
    }
    const method = items[key][mode];
    if (!method) {
      return;
    }

    promises.push(items[key]::method());
  });
  await Promise.all(promises);
}


class ContainerLoader {

  constructor(componentSchema) {
    const isComponent = (obj) => componentSchema.isComponent(obj);
    const excludeFiles = (path) => /.\.spec.js$/.test(path); // TODO: make configurable
    this.scanner = new Scanner(isComponent, excludeFiles);

    this.componentFactory = new ComponentFactory(componentSchema, IdGenerator);
  }

  async load(dirPath) {
    return this.scanner.scan(dirPath)
      .map((obj) => this.componentFactory.create(obj));
  }
}


class Container {

  constructor(rootDir, componentSchema, parent) {
    this.componentSchema = componentSchema;
    this.rootDir = rootDir;
    this.parent = parent;
    this.children = [];

    this.registry = new Registry();
    this.loader = new ContainerLoader(componentSchema);
  }

  async init() {
    this.components = await this.loader.load(this.rootDir);
    this.components.forEach((component) => this.registry.add(component));
    await invokeLifecycleMethod(this.components, 'init');
    await invokeLifecycleMethod(this.children, 'init');
  }

  async start() {
    await invokeLifecycleMethod(this.components, 'start');
    await invokeLifecycleMethod(this.children, 'start');
  }

  async stop() {
    await invokeLifecycleMethod(this.components, 'stop');
    await invokeLifecycleMethod(this.children, 'stop');
  }

  fork(rootDir, componentSchema = this.componentSchema) {
    const forked = new Container(rootDir, componentSchema, this);
    this.children.push(forked);
    return forked;
  }
}


export default Container;
