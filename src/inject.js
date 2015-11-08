import {isString, isFunction} from 'lodash';


function isComponent(target) {
  return target.id && target.type;
}

function inject(reference) {
  return (target, key) => {
    if (!isComponent(target)) {
      throw new Error(`unable to inject into property of '${target.name}': not a component`);
    }

    let id;
    if (isString(reference)) {
      id = reference;
    } else if (isFunction(reference)) {
      if (!isComponent(reference)) {
        throw new Error(`unable to inject into property of '${target.name}': not a component`);
      }
      id = reference.id;
    } else {
      // TODO: try to extract the name from the field name (need a namespace for that)
      throw new Error(`unable to inject into '${key}' of '${target.id}': missing ID`);
    }

    const proto = target.prototype;
    proto.dependencies = proto.dependencies || {};
    if (proto.dependencies[key]) {
      throw new Error(`unable to inject into '${target.name}': conflicting dependency`);
    }
    proto.dependencies[key] = id;
  };
}


export default inject;
