/**
 * Created by awedag on 27.11.17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {User, UserAuth, UserPwd} from '../_models/user.model';
import { appConfig } from '../_helpers/app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from './http-wrapper.service';
import {UserAuthService} from './user-auth.service';
import {UserContentDbService} from "./user-content-db.service";


@Injectable()
export class UserContentService {
  isLoggedin: boolean = false;
  constructor(
    //p rivate http: Http
    private httpWrp: HttpWrapper, private userContentDbService: UserContentDbService) {

    // if there is a user with a JWT, we claim we are logged in - otherwise user needs to login again using his password
  //  if (this.userAuthSrv.getCurrentUserJwt() !== null){
  //    this.isLoggedin = true;
  //  }
  }

  getUserContent() {

// instead of json use JSON.strinfiy
    return this.httpWrp.get('/api/user/contents')
      .map((userContent: User) => {
        console.log('userAuth ist :' + userContent.email);
        if (userContent) {
          console.dir(userContent);
          // console.log(user.token);
          this.userContentDbService.saveCurrentUser(userContent);
        }
        return userContent;
      });

  }

  clear() {
    this.userContentDbService.removeCurrentUser();
  }

}
