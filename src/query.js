import createComponent from './factory';


function query(namespace, id) {
  return (target) => {
    createComponent(target, namespace, id, 'Query');
  };
}


export default query;
