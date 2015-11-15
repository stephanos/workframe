import createComponent from './factory';


function mutator(namespace, id) {
  return (target) => {
    createComponent(target, {
      injectTypeWhitelist: ['Query'],
      namespace: namespace,
      type: 'Mutator',
      id: id,
    });
  };
}


export default mutator;
