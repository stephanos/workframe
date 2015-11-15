import AccessorFactory from './accessor';
import BehaviorFactory from './behavior';
import ComponentFactory from './factory';
import ComponentValidator from './util';
import Injector from './inject';
import LoaderFactory from './loader';
import MutatorFactory from './mutator';
import ProcessorFactory from './processor';
import Registry from './registry';


const registry = new Registry();
const componentFactory = new ComponentFactory(registry);
const componentValidator = new ComponentValidator();
const injector = new Injector(componentValidator);

const accessorFactory = new AccessorFactory(componentFactory);
const behaviorFactory = new BehaviorFactory(componentFactory);
const loaderFactory = new LoaderFactory(componentFactory);
const mutatorFactory = new MutatorFactory(componentFactory);
const processorFactory = new ProcessorFactory(componentFactory);

function toDecorator(fn) {
  return (target) => {
    return (...args) => {
      return fn(target, ...args);
    };
  };
}

export default {
  accessor: toDecorator(accessorFactory.build),
  behavior: toDecorator(behaviorFactory.build),
  loader: toDecorator(loaderFactory.build),
  mutator: toDecorator(mutatorFactory.build),
  inject: toDecorator(injector.build),
  processor: toDecorator(processorFactory.build),
};
