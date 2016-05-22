import path from 'path';
import { Container } from './';


describe('Container', () => {
  it('TODO', async () => {
    class ServiceType {
      static appliesTo() {
        return true;
      }
    }
    const container = new Container([ServiceType]);
    await container.init(path.join(__dirname, 'fixtures', 'simple'));
  });
});
