import requireDirectory from 'require-directory';


function createContext(types, router) {
  const context = {};
  types.forEach((t) => {
    context[t.typeName] = {
      router,
    };
  });
  return context;
}


function beforeInit(context, types) {
  types.forEach((t) => {
    if (t.beforeInitialize) {
      t.beforeInitialize(context[t.typeName]);
    }
  });
}

function loadComponents(module) {
  requireDirectory(module, {
    exclude: (path) => /.\.spec.js$/.test(path) || /node_modules$/.test(path),
  });
}

function initComponents(context, components) {
  components.forEach((component) => {
    const type = component.type;
    if (type.initialize) {
      type.initialize(context[type.typeName], component);
    }

    if (component.initialize) {
      component.initialize();
    }
  });
}

function afterInit(context, types) {
  types.forEach((t) => {
    if (t.afterInitialize) {
      t.afterInitialize(context[t.typeName]);
    }
  });
}


class API {

  constructor(types, router, componentFactory, opts) {
    this.types = types;
    this.router = router;

    this.context = createContext(types, router);
    beforeInit(this.context, types);
    loadComponents(opts.module);
    initComponents(this.context, componentFactory.componentsSortedByCreation);
    afterInit(this.context, types);
  }

  dispatch(...args) {
    return this.router.handle(...args);
  }

  terminate() {
    this.types.forEach((t) => {
      if (t.terminate) {
        t.terminate(this.context[t.typeName]);
      }
    });
  }
}


export default API;
