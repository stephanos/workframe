import path from 'path';

import { ComponentFactory } from '../component2';
import { IdGenerator } from '../../util';
import Scanner from '../scanner';
import Status from '../status';


async function initChildren(container) {
  await Promise.all(container.children.map((c) => c.init()));
}

function createScanner(componentSchema) {
  const isComponent = (obj) => componentSchema.isComponent(obj);
  const excludeFiles = (filePath, rootDir) => {
    if (/.\.spec.js$/.test(filePath)) {
      return true;
    }

    if (/^__tests/.test(path.relative(rootDir, filePath))) {
      return true;
    }

    // TODO: make configurable

    return false;
  };
  return new Scanner(isComponent, excludeFiles);
}

function load(container) {
  const schema = container.componentSchema;
  const componentFactory = new ComponentFactory(schema, IdGenerator);
  const scanner = createScanner(schema);

  const components =
    scanner.scan(container.rootDir)
      .map((obj) => componentFactory.create(obj));
  components.forEach((comp) => container.registry.add(comp));

  // TODO: validate registry (e.g. no cycles)
}


async function init(container) {
  container.updateStatus(Status.INITIALISING);

  // children must be initilises BEFORE parent
  await initChildren(container);
  load(container);

  container.updateStatus(Status.INITIALISED);
}


export default init;
