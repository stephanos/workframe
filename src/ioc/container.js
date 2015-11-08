import {isFunction, isString} from 'lodash';

const idRegex = new RegExp('^([a-zA-Z:])+$');


function findComponent(container, id) {
  const Component = container._componentByIds[id];
  if (Component) {
    return Component;
  }
  return null;
}

function registerComponent(container, Component) {
  if (!isFunction(Component)) {
    throw new Error(`can not register '${Component}': invalid value`);
  }

  const id = Component.prototype.id;
  if (id === undefined) {
    throw new Error(`can not register '${Component.name}': missing name`);
  }
  if (!isString(id) || !idRegex.test(id)) {
    throw new Error(`can not register '${id}': invalid name`);
  }
  if (findComponent(container, id)) {
    throw new Error(`can not register '${id}': already exists`);
  }

  container._componentByIds[id] = Component;
}


class Container {

  constructor() {
    this._componentByIds = {};
  }

  register(Component) {
    registerComponent(this, Component);
  }
}


export default Container;
