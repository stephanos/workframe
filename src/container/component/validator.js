import { isString } from 'util';
import { CreateComponentError } from './errors';


const nameRegex = new RegExp('^([a-zA-Z])+$');


class Validator {

  validateName(input, name) {
    if (name === undefined || !isString(name) || !nameRegex.test(name)) {
      throw new CreateComponentError(`'${name}' must be string with characters only`);
    }
  }

  validateDependencies(input, type, dependencies) {
    Object.keys(dependencies).forEach((property) => {
      if ({}.hasOwnProperty.call(dependencies, property)) {
        const dependency = dependencies[property];
        const depTypeName = dependency.type.typeName;
        if (type.injectTypeWhitelist.indexOf(depTypeName) === -1) {
          throw new Error(`invalid dependency '${dependency.name}' of '${property}' in '${input.name}': type '${depTypeName}' is not allowed`);
        }
      }
    });
  }
}


export default Validator;
