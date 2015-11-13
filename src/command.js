import createComponent from './factory';


function command(namespace, id) {
  return (target) => {
    createComponent(target, {
      injectTypeWhitelist: ['Query'],
      namespace: namespace,
      type: 'Command',
      id: id,
    });
  };
}


export default command;
