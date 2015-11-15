import createComponent from './factory';


function loader(namespace, id) {
  return (target) => {
    createComponent(target, {
      injectTypeWhitelist: [],
      namespace: namespace,
      type: 'Loader',
      id: id,
    });
  };
}


export default loader;
