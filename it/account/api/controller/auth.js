import { Component } from 'workframe';
import { Method, Resource } from 'workframe/http';


@Component()
class AuthenticationController {

  // @Inject(AccountAccessor)
  // accountAccessor;
  //
  // @Inject(ChangeEmailProcessor)
  // changeEmailProcessor;

  @Resource(Method.PUT, '/')
  async changeEmailAddress() {
    return;
  }
}


export default AuthenticationController;
