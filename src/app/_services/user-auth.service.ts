import {Inject, Injectable} from '@angular/core';
import {StorageService, StorageKeys} from './storage.service';

import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {appConfig} from '../_helpers/app.config';
import {User, UserAuth} from '../_models/user.model';
import {DbService} from './db.service';

@Injectable()
export class DbServiceUserAuth extends DbService<UserAuth> {
  constructor(@Inject(StorageService) storage) {
    super(storage, StorageKeys.keyCurrentUser);
  }
}

@Injectable()
export class UserAuthService {

  // private userAuthCache: UserAuth = null;
  //private dbUser: DbService<UserAuth> = null;

  constructor(private dbUser: DbServiceUserAuth) {
    console.log('User-AuthService constructed :' + this.dbUser.storageKey);
    //this.dbUser = dbUser;


    //   this.userAuthCache = null;
  }

  public saveCurrentUser(data: UserAuth) {
    //   this.userAuthCache = data;
    this.dbUser.saveCurrentData(data);
    //  this.storage.write(StorageKeys.keyCurrentUser, data);

  }

  public removeCurrentUser() {
    console.log('remove current userAuth');
    // this.userAuthCache = null;
    this.dbUser.removeCurrentData();
    //  this.storage.remove(StorageKeys.keyCurrentUser);
  }

  public getCurrentUser() {
    return this.dbUser.getCurrentData();
  }

  public getCurrentUserJwt(): string {
    const userAuth = this.dbUser.getCurrentData();

    if (!userAuth) {
      console.log('userAuth is null -> return null');
      return null;
    }
    return userAuth.token;
  }

  public getCurrentUsername(): string {
    const userAuth = this.dbUser.getCurrentData();

    if (!userAuth) {
      console.log('userAuth is null');
      return null;
    }
    return userAuth.email;
  }

  public getCurrentCan(): string[] {
    const userAuth = this.dbUser.getCurrentData();

    if (!userAuth) {
      console.log('userAuth is null');
      return null;
    }
    return userAuth.user_can;
  }

  // public saveUserAuth(ua: UserAuth) {
  //   this.saveCurrentUser(ua);
  // }

}


