/**
 * Created by awedag on 20.11.17.
 */

import { Injectable } from '@angular/core';
import { StorageService, StorageKeys } from './storage.service';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { appConfig } from '../_helpers/app.config';
import { User } from '../_models/user.model';


@Injectable()
export class UserContentDbService {

  private userContentCache: User = null;
  constructor(private storage: StorageService) {
    console.log('User-UserContentDbService constructed');
  }

  public saveCurrentUser(data: User){
    this.userContentCache = data;
    console.log('storage');
    console.log(this.userContentCache);
    this.storage.write(StorageKeys.keyCurrentUserContent, data);

  }

  public removeCurrentUser() {
    this.storage.remove(StorageKeys.keyCurrentUserContent);
  }

  public getCurrentUser(): User {
    console.log('userContentGetCurrentUser:'+this.userContentCache);
    if (!this.userContentCache) {
      this.userContentCache = this.storage.read(StorageKeys.keyCurrentUserContent);
      console.log('userContentGetCurrentUserund jetzt:'+this.userContentCache);

      return this.userContentCache;
    } else {
      return this.userContentCache;
    }
  }


}
