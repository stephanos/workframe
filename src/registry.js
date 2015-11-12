import {isFunction} from 'lodash';


export class EntryError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'EntryError';
  }
}

export class KeyError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'KeyError';
  }
}


function findComponent(container, id) {
  const Component = container._componentByIds[id];
  if (Component) {
    return Component;
  }
  return null;
}

function addComponent(container, Component) {
  if (!isFunction(Component)) {
    throw new EntryError(`can not add '${Component}': invalid value`);
  }

  const id = Component.id;
  if (findComponent(container, id)) {
    throw new KeyError(`can not add '${id}': already exists`);
  }

  container._componentByIds[id] = Component;
}


class Registry {

  constructor() {
    this._componentByIds = {};
  }

  add(Component) {
    addComponent(this, Component);
  }
}


export default Registry;
