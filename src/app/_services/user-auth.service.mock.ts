import { Injectable } from '@angular/core';
import { UserAuth } from '../_models/user.model';


@Injectable()
export class UserAuthServiceMock {

  private userAuthCache: UserAuth = null;

  public saveCurrentUser(data: UserAuth) {
    this.userAuthCache = data;

  }

  public removeCurrentUser() {
  }

  private getCurrentUser(): UserAuth {
    if (!this.userAuthCache) {

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

  public saveUserAuth(ua: UserAuth) {
    this.saveCurrentUser(ua);
  }
}
