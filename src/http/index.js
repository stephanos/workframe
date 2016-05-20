import Method from './methods';
import ResourceFactory from './resource';

export { Method };

const resourceFactory = new ResourceFactory();
export function Resource(...args) {
  return resourceFactory.annotate(...args);
}
