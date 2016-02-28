import { isFunction } from 'lodash';


function verifyProcessFunc(input) {
  const processFunc = input.prototype.process;
  if (!isFunction(processFunc)) {
    throw new Error(`method 'process' must be defined`);
  }
  // if (processFunc.length !== 1) {
  //   throw new Error(`method 'process' must have exactly 1 parameter`);
  // }
}


class ProcessorComponentType {

  static typeName = 'Processor';
  static injectTypeWhitelist = ['Behavior', 'Mutator', 'Processor', 'Viewer'];

  static verify(target) {
    verifyProcessFunc(target);
  }

  static addRelation(registry, input, opts) {
    registry.setConnection(input, 'handles', opts[1]);
  }
}


export default ProcessorComponentType;
