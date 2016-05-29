import { relations } from '../component2';


class Transitioner {

  constructor(network, factory) {
    this.network = network;
    this.factory = factory;
  }

  async to(state) {
    const promises = [];

    const transition = async (values) => {
      const untransitioned = [];
      values.forEach((value) => {
        const dependsOn = this.network.connectionsFrom(value, relations.DEPENDS);
        const untransitionedDependency = dependsOn.find((dep) => values.indexOf(dep.to) >= 0);
        if (untransitionedDependency) {
          untransitioned.push(value);
          return;
        }

        const instance = this.factory.create(value);
        if (typeof instance[state] !== 'function') {
          return;
        }

        const stateChangeP = instance[state]();
        promises.push(stateChangeP);
      });

      if (untransitioned.length > 0) {
        await transition(untransitioned);
      }
    };

    await transition(this.network.values);
    await Promise.all(promises);
  }
}


export default Transitioner;
