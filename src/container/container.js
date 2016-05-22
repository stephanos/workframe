import ComponentFactory from './component2/factory';
import ComponentSchema from './component2/schema';

import Registry from './registry';
import Scanner from './scanner';

import { IdGenerator } from '../util';


class ContainerLoader {

  constructor(componentTypes) {
    const schema = new ComponentSchema(componentTypes);

    const isComponent = (obj) => schema.isComponent(obj);
    const excludeFiles = (path) => /.\.spec.js$/.test(path); // TODO: make configurable
    this.scanner = new Scanner(isComponent, excludeFiles);

    this.componentFactory = new ComponentFactory(schema, IdGenerator);
  }

  async load(dirPath) {
    return this.scanner.scan(dirPath)
      .map((obj) => this.componentFactory.create(obj));
  }
}


class Container {

  constructor(componentTypes, parent) {
    this.parent = parent;
    this.componentTypes = componentTypes;

    this.registry = new Registry();
    this.loader = new ContainerLoader(componentTypes);
  }

  async init(dirPath) {
    const components = await this.loader.load(dirPath);
    components.forEach((component) => this.registry.add(component));
  }

  // fork() {
  //   return new Container(this.componentTypes, this);
  // }
}


export default Container;
