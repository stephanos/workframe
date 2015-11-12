import ComponentUtil from './component';


function command(namespace, id) {
  return (target) => {
    ComponentUtil.create(target, namespace, id, 'Command');
  };
}


export default command;
