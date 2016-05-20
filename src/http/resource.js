/* eslint no-param-reassign:0 */

class ResourceFactory {

  annotate(path, method) {
    return (target, key) => {
      target[key].path = path;
      target[key].method = method;
    };
  }
}


export default ResourceFactory;
