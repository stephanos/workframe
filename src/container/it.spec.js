import path from 'path';
import { Container } from './';


describe('Container', () => {
  it('should initialize', async () => {
    class ServiceType {}

    const container = new Container({
      isComponent: () => true,
      typeOf: () => ServiceType,
    });
    await container.init(path.join(__dirname, 'fixtures', 'simple'));
  });
});
