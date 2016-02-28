/* eslint no-param-reassign:0 */
import Component from '../component/component';

class Injector {

  static inject(reference) {
    return (target, key, descriptor) => {
      const component = new Component(target.constructor);
      try {
        component.addDependency(key, reference);
      } catch (err) {
        throw new Error(`unable to inject into '${ key }' of '${ target.constructor.name }': ${ err.message }`);
      }
      descriptor.writable = true;
      descriptor.initializer = () => undefined;
      return descriptor;
    };
  }
}

export default Injector;