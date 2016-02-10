import Method from '../internal/http/methods';
import ResourceFactory from '../internal/http/resource';


export { Method };

const resourceFactory = new ResourceFactory();
export function Resource(...args) {
  return resourceFactory.annotate(...args);
}
