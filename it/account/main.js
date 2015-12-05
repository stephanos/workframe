import {bootstrap} from '../../src/index.js';

import {AccountAccessor} from './read';
import {ChangeEmailProcessor} from './write';


const App = bootstrap();


export default App;
export {
  AccountAccessor,
  ChangeEmailProcessor,
};