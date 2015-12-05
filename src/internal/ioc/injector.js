import Component from '../component/component';


class Injector {

  inject(target, key, reference) {
    const component = new Component(target);
    try {
      component.addDependency(key, reference);
    } catch (err) {
      throw new Error(`unable to inject into '${key}' of '${target.name}': conflicting dependency`);
    }
    return component;
  }
}


export default Injector;
