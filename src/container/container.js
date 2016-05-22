import ComponentFactory from './component2/factory';
import Registry from './registry';
import Scanner from './scanner';


class Container {

  constructor(componentSchema) {
    const isComponent = (obj) => componentSchema.isComponent(obj);
    const excludeFiles = (path) => /.\.spec.js$/.test(path); // TODO: make configurable
    this.scanner = new Scanner(isComponent, excludeFiles);
    this.componentFactory = new ComponentFactory(componentSchema);
    this.registry = new Registry();
  }

  init(module) {
    this.scanner.scan(module)
      .map((object) => this.componentFactory.create(object))
      .forEach((component) => this.registry.add(component));
  }
}


export default Container;
