class LoaderFactory {

  constructor(componentFactory) {
    this.componentFactory = componentFactory;
  }

  build(target, namespace, id) {
    this.componentFactory.build(target, {
      injectTypeWhitelist: [],
      namespace: namespace,
      type: 'Loader',
      id: id,
    });
  }
}


export default LoaderFactory;
