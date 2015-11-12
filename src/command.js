import createComponent from './factory';


function command(namespace, id) {
  return (target) => {
    createComponent(target, {
      namespace: namespace,
      type: 'Command',
      id: id,
    });
  };
}


export default command;
