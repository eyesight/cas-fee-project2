import { Injectable } from '@angular/core';
import {User, UserPwdChange, UserAvatar} from '../_models/user.model';
import { HttpWrapper } from './http-wrapper.service';

@Injectable()
export class UserService {
  constructor(private httpWrp: HttpWrapper) { }

  public create(user: User) {
    return this.httpWrp.postNoJWT('/api/register', user);
  }

  public update(user: User) {
    return this.httpWrp.put('/api/user/update', user);
  }

  public updatePassword(userPwd: UserPwdChange) {
    return this.httpWrp.put('/api/user/passwordchange', userPwd);
  }

  public updateAvatar(userAvatar: UserAvatar) {
    return this.httpWrp.put('/api/user/avatar', userAvatar);
  }

  public showKlasses() {
    return this.httpWrp.get('/klasse');
  }

}
