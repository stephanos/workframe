import requireDirectory from 'require-directory';

class Scanner {

  loadComponents(module) {
    const components = [];
    requireDirectory(module, {
      visit: (obj) => {
        if (obj.default && obj.default.isComponent) {
          components.push(obj);
        }
      },
      exclude: (path) => /.\.spec.js$/.test(path), // TODO: make configurable
    });
    return components;
  }
}


export default Scanner;
