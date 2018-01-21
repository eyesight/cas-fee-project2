import { Injectable } from '@angular/core';
import { UserAuth, UserPwd } from '../_models/user.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpWrapper } from './http-wrapper.service';
import { UserAuthService } from './user-auth.service';

@Injectable()
export class AuthenticationService {
  public isLoggedin: boolean = false;
  constructor(
    private httpWrp: HttpWrapper,
    private userAuthSrv: UserAuthService) {

    // if there is a user with a JWT, we claim we are logged in - otherwise user needs to login again using his password
    if (this.userAuthSrv.getCurrentUserJwt() !== null) {
      this.isLoggedin = true;
    }
  }

  public login(username: string, password: string): Observable<UserAuth> {
    const userPwd = new UserPwd(username, password);

// instead of json use JSON.strinfiy
    return this.httpWrp.postNoJWT('/api/authenticate', userPwd)
      .map((user: UserAuth) => {
        if (user && user.token) {
          this.userAuthSrv.saveCurrentUser(user);
          this.isLoggedin = true;
        }
        return user;
      });
  }

  public logout() {
    // remove user from local storage to log user out
    setTimeout(() => this.isLoggedin = false, 50);
    this.userAuthSrv.removeCurrentUser();
  }

}
