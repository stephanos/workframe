import createComponent from './factory';


function command(namespace, id) {
  return (target) => {
    createComponent(target, namespace, id, 'Command');
  };
}


export default command;
