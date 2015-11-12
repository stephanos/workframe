import ComponentUtil from '../component';


function query(namespace, id) {
  return (target) => {
    ComponentUtil.create(target, namespace, id, 'Query');
  };
}


export default query;
