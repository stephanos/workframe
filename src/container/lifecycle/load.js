import ComponentFactory from '../component2/factory';
import { IdGenerator } from '../../util';
import Scanner from '../scanner';
import Status from '../status';


function createScanner(container) {
  const isComponent = (obj) => container.componentSchema.isComponent(obj);
  const excludeFiles = (path) => /.\.spec.js$/.test(path); // TODO: make configurable
  return new Scanner(isComponent, excludeFiles);
}

function load(container) {
  container.updateStatus(Status.INITIALISING);

  const componentFactory = new ComponentFactory(container.componentSchema, IdGenerator);
  const scanner = createScanner(container);

  scanner.scan(container.rootDir)
    .map((obj) => componentFactory.create(obj))
    .forEach((comp) => container.registry.add(comp));

  // TODO: validate registry (e.g. no cycles)

  container.updateStatus(Status.INITIALISED);
}


export default load;
