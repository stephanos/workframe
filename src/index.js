import accessor from './accessor';
import behavior from './behavior';
import mutator from './mutator';
import Injector from './inject';
import query from './query';
import processor from './processor';


const injector = new Injector();

export default {
  accessor: accessor,
  behavior: behavior,
  mutator: mutator,
  inject: (reference) => {
    return (target, key) => {
      injector.run(reference, target, key);
    };
  },
  processor: processor,
  query: query,
};
