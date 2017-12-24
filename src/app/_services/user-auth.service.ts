/**
 * Created by awedag on 20.11.17.
 */

import {Injectable} from '@angular/core';
import {StorageService, StorageKeys} from './storage.service';

import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {appConfig} from '../_helpers/app.config';
import {User, UserAuth} from '../_models/user.model';


@Injectable()
export class UserAuthService {

  private userAuthCache: UserAuth = null;

  constructor(private storage: StorageService) {
    console.log('User-AuthService constructed');
    this.userAuthCache = null;
  }

  public saveCurrentUser(data: UserAuth) {
    this.userAuthCache = data;
    this.storage.write(StorageKeys.keyCurrentUser, data);

  }

  public removeCurrentUser() {
    console.log('remove current userAuth');
    this.userAuthCache = null;
    this.storage.remove(StorageKeys.keyCurrentUser);
  }

  private getCurrentUser(): UserAuth {
    if (this.userAuthCache && this.userAuthCache.email) {
      console.log('userAuth: getCurrentuser:email:' + this.userAuthCache.email);
    }
    if (this.userAuthCache === null) {
      console.log('userAuth: getCurrentUser from dB');
      this.userAuthCache = this.storage.read(StorageKeys.keyCurrentUser);
      return this.userAuthCache;
    } else {
      return this.userAuthCache;
    }
  }

  public getCurrentUserJwt(): string {
    const userAuth = this.getCurrentUser();

    if (!userAuth) {
      console.log('userAuth is null -> return null');
      return null;
    }
    return userAuth.token;
  }

  public getCurrentUsername(): string {
    const userAuth = this.getCurrentUser();

    if (!userAuth) {
      console.log('userAuth is null');
      return null;
    }
    return userAuth.email;
  }

  public getCurrentCan(): string[] {
    const userAuth = this.getCurrentUser();

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
