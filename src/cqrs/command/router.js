/* @flow */

import { ApplicationContext } from '../../app';
import { Component, Inject, OnInit } from '../../container';

import AggregatorRef from '../aggregatorRef';
import CommandHandler from './commandHandler';


@Component()
class CommandRouter {

  @Inject() appContext: ApplicationContext;
  @Inject() commandHandler: CommandHandler;

  processorByCommandType = {};
  aggregateComponentByCommandType = {};

  @OnInit()
  async init() {
    const processorComponents = this.appContext.getComponentsByType('Processor');
    processorComponents.forEach((processorComponent) => {
      const processor = this.appContext.createComponent(processorComponent);

      const commandType = processorComponent.parameters[1]; // TODO: handle missing value
      this.processorByCommandType[commandType] = processor;

      const aggregateType = processorComponent.parameters[0];
      const aggregateComp = this.appContext.getComponentByFactory(aggregateType);
      this.aggregateComponentByCommandType[commandType] = aggregateComp;
    });
  }

  async process(command: Object) {
    const processor = this.processorByCommandType[command.constructor];
    const aggregateComp = this.aggregateComponentByCommandType[command.constructor];
    const aggregateRef = new AggregatorRef(
      'default',
      aggregateComp.parameters[0],
      command.aggregateId,
      0
    );
    return await this.commandHandler.handle(aggregateRef, processor, command);
  }
}


export default CommandRouter;
