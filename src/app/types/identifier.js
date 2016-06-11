import { endsWith } from 'lodash';


class Identifier {

  test(type, input) {
    const inputName = input.name;
    const typeName = type.name;
    return endsWith(inputName, typeName);
  }
}


export default Identifier;
