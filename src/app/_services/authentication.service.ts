import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserAuth, UserPwd } from '../_models/user.model';
import { appConfig } from '../_helpers/app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from './http-wrapper';
import {UserAuthService} from './user-auth.service';

@Injectable()
export class AuthenticationService {
  isLoggedin: boolean = false;
  constructor(
    //p rivate http: Http
    private httpWrp: HttpWrapper, private userAuthSrv: UserAuthService) {

    // if there is a user with a JWT, we claim we are logged in - otherwise user needs to login again using his password
    if (this.userAuthSrv.getCurrentUserJwt() !== null){
      this.isLoggedin = true;
    }
  }

  login(username: string, password: string) {
    console.log('username:' + username);

    const userPwd = new UserPwd(username, password);

// instead of json use JSON.strinfiy
    return this.httpWrp.postNoJWT('/api/authenticate', userPwd)
      .map((user: UserAuth) => {
        console.log('userAuth ist :' + user.email);
        if (user && user.token) {
          // console.log(user.token);
          this.userAuthSrv.saveCurrentUser(user);
          this.isLoggedin = true;
        }
        return user;
      });

  }

  logout() {
    // remove user from local storage to log user out
    setTimeout(() => this.isLoggedin = false, 50);
    this.userAuthSrv.removeCurrentUser();
  }

}
