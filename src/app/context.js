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

  get components() {
    return this.container.components;
  }
}


export default ApplicationContext;
