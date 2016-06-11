import { Component } from '../container';


@Component()
class ApplicationContext {

  async start() {
    this.container = process.rootContainer; // TODO: find a cleaner way
  }

  get components() {
    const result = [];

    const collectComponents = (container) => {
      result.push(...container.components);
      container.children.forEach((child) => collectComponents(child));
    };
    collectComponents(this.container);

    return result;
  }
}


export default ApplicationContext;
