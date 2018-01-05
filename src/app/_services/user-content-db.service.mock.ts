
import {Injectable} from '@angular/core';
import {StorageService, StorageKeys} from './storage.service';

import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {appConfig} from '../_helpers/app.config';
import {User} from '../_models/user.model';


@Injectable()
export class UserContentDbServiceMock {

  private userContentCache: User = new User;

  constructor(private storage: StorageService) {
    console.log('User-UserContentDbService constructed');
    this.userContentCache.email = 'test@test.com';

  }

  public saveCurrentUser(data: User) {
    this.userContentCache = data;

  }

  public removeCurrentUser() {
  }

  public getCurrentUser(): User {
    console.log('userContentGetCurrentUser:' + this.userContentCache);
    if (!this.userContentCache) {
      return this.userContentCache || null;
    } else {
      return this.userContentCache;
    }
  }


}
