class AggregatorComponentType {

  static typeName = 'Aggregator';
  static injectTypeWhitelist = [];

  static verify() {
    // TODO: verify that opts[1] is an Event
  }

  static addRelation(registry, input, opts) {
    registry.setConnection(input, 'aggregates', opts[1]);
  }
}


export default AggregatorComponentType;
