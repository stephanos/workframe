import { Component, Inject } from 'workframe';
import { Method, Resource } from 'workframe/http';

import ChangeEmailProcessor from './processor';


@Component()
class ChangeEmailAddressController {

  @Inject(ChangeEmailProcessor)
  changeEmailProcessor;


  @Resource(Method.PUT, '/')
  async changeEmailAddress() {
    // console.log('PUT');
  }
}


export default ChangeEmailAddressController;
