import {isString} from 'util';

import {CreateComponentError} from './errors';


const nameRegex = new RegExp('^([a-zA-Z])+$');
const namespaceRegex = new RegExp('^([a-z])+$');


class Validator {

  validateName(input, name) {
    if (name === undefined || !isString(name) || !nameRegex.test(name)) {
      throw new CreateComponentError(`'${name}' must be string with characters only`);
    }
  }

  validateNamespace(input, ns) {
    if (ns === undefined || !isString(ns) || !namespaceRegex.test(ns)) {
      throw new CreateComponentError(`namespace '${ns}' must be string with lowercase characters only`);
    }
  }

  validateDependencies(input, type, dependencies) {
    for (const property in dependencies) {
      if (dependencies.hasOwnProperty(property)) {
        const dependency = dependencies[property];
        const depTypeName = dependency.type.typeName;
        if (type.injectTypeWhitelist.indexOf(depTypeName) === -1) {
          throw new Error(`invalid dependency '${dependency.name}' of '${property}' in '${input.name}': type '${depTypeName}' is not allowed`);
        }
      }
    }
  }
}


export default Validator;
