import {isFunction} from 'lodash';


function verifyProcessFunc(input) {
  const processFunc = input.prototype.process;
  if (!isFunction(processFunc)) {
    throw new Error(`method 'process' must be defined`);
  }
  if (processFunc.length !== 1) {
    throw new Error(`method 'process' must have exactly 1 parameter`);
  }
}


class ProcessorFactory {

  constructor(componentFactory) {
    this.componentFactory = componentFactory;
  }

  build(target, namespace, id) {
    verifyProcessFunc(target);
    this.componentFactory.build(target, {
      injectTypeWhitelist: ['Behavior', 'Command', 'Processor', 'Query'],
      namespace: namespace,
      type: 'Processor',
      id: id,
    });
  }
}


export default ProcessorFactory;
