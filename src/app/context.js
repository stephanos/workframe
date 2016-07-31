import { Component, OnStart } from '../container';


@Component()
class ApplicationContext {

  @OnStart()
  async start() {
    this.container = process.rootContainer; // TODO: find a cleaner way
  }

  createComponent(component) {
    return this.container.createComponent(component);
  }

  getComponentByFactory(factory) {
    return this.container.components.find((c) => c.factory === factory);
  }

  getComponentByName(name) {
    return this.container.components.find((c) => c.factory.name === name);
  }

  getComponentsByType(typeName) {
    return this.container.components.filter((c) => c.type.name === typeName);
  }
}


export default ApplicationContext;
