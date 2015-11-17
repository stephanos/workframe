import AccessorFactory from './accessor';
import BehaviorFactory from './behavior';
import ComponentFactory from './factory';
import ComponentValidator from './util';
import Injector from './injector';
import LoaderFactory from './loader';
import MutatorFactory from './mutator';
import ProcessorFactory from './processor';
import Registry from './registry';


function toDecorator(factory, args) {
  return (target) => {
    return factory.build(target, ...args);
  };
}


const registry = new Registry();
const componentValidator = new ComponentValidator();
const componentFactory = new ComponentFactory(registry, componentValidator);


const accessorFactory = new AccessorFactory(componentFactory);
export function accessor(...args) {
  return toDecorator(accessorFactory, ...args);
}

const behaviorFactory = new BehaviorFactory(componentFactory);
export function behavior(...args) {
  return toDecorator(behaviorFactory, ...args);
}

const injector = new Injector(componentValidator);
export function inject(...args) {
  return toDecorator(injector, ...args);
}

const loaderFactory = new LoaderFactory(componentFactory);
export function loader(...args) {
  return toDecorator(loaderFactory, ...args);
}

const mutatorFactory = new MutatorFactory(componentFactory);
export function mutator(...args) {
  return toDecorator(mutatorFactory, ...args);
}

const processorFactory = new ProcessorFactory(componentFactory);
export function processor(...args) {
  return toDecorator(processorFactory, ...args);
}
