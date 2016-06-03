import path from 'path';
import { Container } from './';


describe('Container', () => {
  it('should start and stop', async () => {
    class ServiceType {}
    const rootDir = path.join(__dirname, 'fixtures', 'simple');
    const schema = { isComponent: () => true, typeOf: () => ServiceType };
    const container = new Container(rootDir, schema);

    await container.start();
    await container.stop();
  });
});
