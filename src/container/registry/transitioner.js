import relations from './relations';
import { OnStart, OnStop } from '../lifecycle/decorators';


class Transitioner {

  constructor(network, factory) {
    this.network = network;
    this.factory = factory;
  }

  async start(dispatcher) {
    await this.to(dispatcher, OnStart, 'connectionsFrom', 'to');
  }

  async stop(dispatcher) {
    await this.to(dispatcher, OnStop, 'connectionsTo', 'from');
  }

  async to(dispatcher, decoratorType, connection, dir) {
    const promises = [];

    const transition = async (values) => {
      const untransitioned = [];
      values.forEach((value) => {
        const dependsOn = this.network[connection](value, relations.DEPENDS);
        const untransitionedDependency = dependsOn.find((dep) => values.indexOf(dep[dir]) >= 0);
        if (untransitionedDependency) {
          untransitioned.push(value);
          return;
        }

        const instance = this.factory.create(value);

        const component = this.network.propsByValue[value].component;
        component.decorations
          .filter((decoration) => decoration.type === decoratorType)
          .filter((decoration) => decoration.target.kind === 'method')
          .map((decoration) => decoration.target.name)
          .forEach((funcName) => promises.push(instance[funcName](dispatcher)));
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
