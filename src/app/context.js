/* @flow */

import { Component, Container, OnInit } from '../container';


@Component()
class ApplicationContext {

  container: Container;

  @OnInit()
  async init() {
    this.container = process.rootContainer; // TODO: find a cleaner way
  }

  createComponent(component: Component) {
    return this.container.createComponent(component);
  }

  getComponentByFactory(factory: Object): ?Component {
    return this.container.components.find((c) => c.factory === factory);
  }

  getComponentByName(name: string): ?Component {
    return this.container.components.find((c) => c.factory.name === name);
  }

  getComponentsByType(typeName: string): Component[] {
    return this.container.components.filter((c) => c.type.name === typeName);
  }
}


export default ApplicationContext;
