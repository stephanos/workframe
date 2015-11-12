import createComponent from './factory';


function query(namespace, id) {
  return (target) => {
    createComponent(target, {
      namespace: namespace,
      type: 'Query',
      id: id,
    });
  };
}


export default query;
