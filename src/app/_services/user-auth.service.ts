import {Inject, Injectable} from '@angular/core';
import {StorageService, StorageKeys} from './storage.service';
import {UserAuth} from '../_models/user.model';
import {DbService} from './db.service';

@Injectable()
export class DbServiceUserAuth extends DbService<UserAuth> {
  constructor(@Inject(StorageService) storage) {
    super(storage, StorageKeys.keyCurrentUser);
  }
}

@Injectable()
export class UserAuthService {

  constructor(private dbUser: DbServiceUserAuth) {
  }

  public saveCurrentUser(data: UserAuth) {
    this.dbUser.saveCurrentData(data);
  }

  public removeCurrentUser() {
    this.dbUser.removeCurrentData();
  }

  public getCurrentUser() {
    return this.dbUser.getCurrentData();
  }

  public getCurrentUserJwt(): string {
    const userAuth = this.dbUser.getCurrentData();

    if (!userAuth) {
      return null;
    }
    return userAuth.token;
  }

  public getCurrentUsername(): string {
    const userAuth = this.dbUser.getCurrentData();

    if (!userAuth) {
      return null;
    }
    return userAuth.email;
  }

  public getCurrentCan(): string[] {
    const userAuth = this.dbUser.getCurrentData();

    if (!userAuth) {
      return null;
    }
    return userAuth.user_can;
  }
}


