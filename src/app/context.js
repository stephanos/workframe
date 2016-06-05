import { Component } from '../container';


@Component()
class ApplicationContext {

  async start() {
    this.container = process.rootContainer; // TODO: find a cleaner way
  }
}


export default ApplicationContext;
