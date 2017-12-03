/**
 * Created by awedag on 03.12.17.
 */
/**
 * Created by awedag on 27.11.17.
 */
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {User, UserAuth, UserPwd} from '../../_models/user.model';
// import { appConfig } from '../_helpers/app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from '../../_services/http-wrapper.service';
// import {UserAuthService} from '../_service/user-auth.service';
// import {UserContentDbService} from "../_service/user-content-db.service";


@Injectable()
export class ClasslistService {

  private classlistCache: User[] = null;
  constructor(
    private httpWrp: HttpWrapper) {
  }

  public getClasslist(): Observable<User[]>  {

// instead of json use JSON.strinfiy
    return this.httpWrp.get('/api/user/classlist')
      .map((result) => {this.classlistCache = result; return result; });
  }

  public getUserDetail(id): User {
    console.log('getUserDetail:' + id);

    if (!this.classlistCache) {
      return null;
    }

    const user  = this.classlistCache
      .filter(x =>  x.id === Number.parseInt(id))[0];
    console.log('user:' + user.id);
    return user;
  }
}
