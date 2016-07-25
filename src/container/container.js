import init from './init';
import Registry from './registry';


class Container {

  constructor(rootDir, componentSchema, parent) {
    this.rootDir = rootDir;
    this.componentSchema = componentSchema;
    this.parent = parent;

    this.registry = parent ? parent.registry : new Registry();
    this.children = [];
  }

  async init() {
    await init(this);
  }

  async start() {
    await this.registry.start(this.dispatcher);
  }

  async stop() {
    await this.registry.stop(this.dispatcher);
  }

  fork(rootDir, componentSchema = this.componentSchema) {
    const forked = new Container(rootDir, componentSchema, this);
    this.children.push(forked);
    return forked;
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
    return this.registry.components;
  }
}


export default Container;
