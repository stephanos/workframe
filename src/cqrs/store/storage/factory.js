import Storage from './storage';
import MemoryStorage from './memory';

import { Component, Inject } from '../../../container';


@Component()
class StorageFactory {

  @Inject() memoryStorage: MemoryStorage;

  create(): Storage {
    return this.memoryStorage;
  }
}


export default StorageFactory;
