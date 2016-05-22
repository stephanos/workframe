import path from 'path';

import { Router } from '../router';
import { ComponentSchema, Container } from '../container';

import { types, TypeIdentifier } from './types';

// function createContext(types, router) {
//   const context = {};
//   types.forEach(t => {
//     context[t.typeName] = {
//       router,
//     };
//   });
//   return context;
// }
//
// function beforeInit(context, types) {
//   types.forEach(t => {
//     if (t.beforeInitialize) {
//       t.beforeInitialize(context[t.typeName]);
//     }
//   });
// }
//
// function loadComponents(module) {
//   const components = [];
//   requireDirectory(module, {
//     visit: obj => {
//       if (obj.default && obj.default.isComponent) {
//         components.push(obj);
//       }
//     },
//     exclude: path => /.\.spec.js$/.test(path),
//   });
//   // return (target) => {
//   //   componentFactory.build(target, args);
//   // };
//   return components;
// }
//
// function initComponents(context, components) {
//   components.forEach(component => {
//     const type = component.type;
//     if (type.initialize) {
//       type.initialize(context[type.typeName], component);
//     }
//
//     if (component.initialize) {
//       component.initialize();
//     }
//   });
// }
//
// function afterInit(context, types) {
//   types.forEach(t => {
//     if (t.afterInitialize) {
//       t.afterInitialize(context[t.typeName]);
//     }
//   });
// }

class Boot {

  constructor(opts) {
    this.opts = opts;
    this.router = new Router();

    const schema = new ComponentSchema(types, new TypeIdentifier());
    this.container = new Container(schema);

    // this.context = createContext(types, router);
    // beforeInit(this.context, types);
    // loadComponents(opts.module);
    // initComponents(this.context, componentFactory.componentsSortedByCreation);
    // afterInit(this.context, types);
  }

  async init() {
    const initDir = path.dirname(this.opts.module.id);
    await this.container.init(initDir);
  }

  async dispatch(...args) {
    return this.router.dispatch(...args);
  }

  async terminate() {
    // this.types.forEach(t => {
    //   if (t.terminate) {
    //     t.terminate(this.context[t.typeName]);
    //   }
    // });
  }
}


export default Boot;
