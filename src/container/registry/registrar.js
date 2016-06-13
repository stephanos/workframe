import Inject from './decorator';
import relations from './relations';


function findDependencies(component) {
  const dependencies = [];

  component.decorations
    .filter((decoration) => decoration.type === Inject)
    .filter((decoration) => decoration.target.kind === 'field')
    .forEach((decoration) => {
      const dependency = decoration.parameters[0];
      if (!dependency) {
        throw new Error(`@Inject on '${decoration.target.name}' in '${component.factory.name}' is missing its dependency reference`);
      }

      dependencies.push({
        to: dependency,
        relation: relations.DEPENDS,
        properties: { fieldName: decoration.target.name },
      });
    });

  return dependencies;
}


class Registrar {

  constructor(network) {
    this.network = network;
  }

  register(component) {
    this.network.add(component.factory, { component });

    const connections = findDependencies(component);
    connections.forEach((connection) => {
      this.network.connect(
        component.factory,
        connection.to,
        connection.relation,
        connection.properties,
      );
    });
  }
}


export default Registrar;
