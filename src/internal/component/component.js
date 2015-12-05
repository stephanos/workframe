import uuid from '../util/uuid';

const metaKey = '__meta';


class Component {

  constructor(Factory) {
    this.factory = Factory;
    this.factory[metaKey] = this.factory[metaKey] || {
      id: uuid.next(),
      dependencies: {},
    };
  }

  get id() {
    return this.factory[metaKey].id;
  }

  set id(id) {
    this.factory[metaKey].id = id;
  }


  get namespace() {
    return this.factory[metaKey].namespace;
  }

  set namespace(ns) {
    this.factory[metaKey].namespace = ns;
  }


  get name() {
    return this.factory[metaKey].name;
  }

  set name(name) {
    this.factory[metaKey].name = name;
  }


  get type() {
    return this.factory[metaKey].type;
  }

  set type(type) {
    this.factory[metaKey].type = type;
  }


  get dependencies() {
    return this.factory[metaKey].dependencies;
  }

  addDependency(property, factory) {
    const deps = this.factory[metaKey].dependencies;
    if (deps[property]) {
      throw new Error(`${property} already exists`);
    }
    deps[property] = new Component(factory);
  }
}


export default Component;
