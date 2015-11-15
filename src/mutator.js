class MutatorFactory {

  constructor(componentFactory) {
    this.componentFactory = componentFactory;
  }

  build(target, namespace, id) {
    this.componentFactory.build(target, {
      injectTypeWhitelist: ['Query'],
      namespace: namespace,
      type: 'Mutator',
      id: id,
    });
  }
}


export default MutatorFactory;
