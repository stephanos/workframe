import { bootstrap } from '../../src';

import { AccountAccessor } from './read/user.accessor';
import { ChangeEmailProcessor } from './write/user-change-email.processor';


const App = bootstrap();


export default App;
export {
  AccountAccessor,
  ChangeEmailProcessor,
};
