import util from 'util';
import { IdGenerator } from '../../util';

const metaKey = '__meta';


class Component {

  constructor(Factory) {
    if (!util.isFunction(Factory)) {
      throw new Error(`'${Factory}' is not a function`);
    }

    this.factory = Factory;
    this.factory[metaKey] = this.factory[metaKey] || {
      id: IdGenerator.next(),
      dependencies: {},
    };
  }


  newInstance() {
    return new this.factory(this.opts);
  }


  get id() {
    return this.factory[metaKey].id;
  }

  set id(id) {
    this.factory[metaKey].id = id;
  }


  get opts() {
    return this.factory[metaKey].opts;
  }

  set opts(opts) {
    this.factory[metaKey].opts = opts;
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
