import { Clock, IdGenerator } from '../util';
import { JournalFactory } from './journal';
import Dispatcher from './dispatcher';


class DispatcherFactory {

  constructor() {
    this.clock = Clock;
    this.idGenerator = IdGenerator;
    this.journal = new JournalFactory().create();
  }

  create() {
    return new Dispatcher(undefined, this.journal, this.idGenerator, this.clock);
  }
}


export default DispatcherFactory;
