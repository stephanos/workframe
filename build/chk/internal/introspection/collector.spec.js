import Collector from './collector';

describe('Collector', () => {
  it('should add an action', () => {
    const collector = new Collector();
    collector.add({
      method: 'test',
      arguments: [1, 2, 3]
    });
  });
});