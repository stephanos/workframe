import { ApplicationContext } from '../../app';
import { Component, Inject, OnInit } from '../../container';


@Component()
class CommandRouter {

  @Inject() appContext: ApplicationContext;

  processorByCommandType = {};


  @OnInit()
  async init() {
    const processorComponents = this.appContext.getComponentsByType('Processor');
    processorComponents.forEach((processorComponent) => {
      const processor = this.appContext.createComponent(processorComponent);
      const parameters = processorComponent.parameters;
      const commandType = parameters[0]; // TODO: handle missing value
      this.processorByCommandType[commandType] = processor;
    });
  }

  async process() {
    // TODO
  }
}


export default CommandRouter;
