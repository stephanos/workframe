import createComponent from './factory';


function query(namespace, id) {
  return (target) => {
    createComponent(target, {
      injectTypeWhitelist: [],
      namespace: namespace,
      type: 'Query',
      id: id,
    });
  };
}


export default query;
