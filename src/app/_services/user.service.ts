import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { appConfig } from '../_helpers/app.config';
import {User, UserPwdChange, UserAvatar, Avatar} from '../_models/user.model';
import { HttpWrapper } from './http-wrapper.service';

@Injectable()
export class UserService {
  constructor(private httpWrp: HttpWrapper) { }

  public getAll() {
    return this.httpWrp.get('/api/users');
  }

  public getById(id: number) {
    return this.httpWrp.get('/api/users/' + id);
  }

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
