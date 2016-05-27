import path from 'path';
import { Container } from './';


describe('Container', () => {
  it('should initialize', async () => {
    class ServiceType {}

    const container = new Container(
      path.join(__dirname, 'fixtures', 'simple'),
      {
        isComponent: () => true,
        typeOf: () => ServiceType,
      },
    );
    await container.init();
  });
});
