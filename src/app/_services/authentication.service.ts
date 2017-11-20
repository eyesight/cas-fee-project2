import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserAuth, UserPwd } from '../_models/user.model';
import { appConfig } from '../_helpers/app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from './http-wrapper';
import {UserAuthService} from "./user-auth.service";

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
          //this.httpWrp.saveJWT(user);
          this.isLoggedin = true;
        }

        return user;
      });
/*
    return this.http.post(appConfig.apiUrl + '/api/authenticate', userPwd)
    // return this.http.post('http://localhost:3020/api/authenticate', "{ \"email\": username, \"pwd\": password }" )
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();

        const userAuth = new UserAuth(user.email, user.token);
        // response.json();

        console.log('userAuth ist :' + userAuth.email);
       // console.dir(userAuth);

        if (user && user.token) {
          // console.log(user.token);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(userAuth));
         // const userItem = localStorage.getItem('currentUser');
         // const userAuth2 = JSON.parse(userItem);
          console.log('userAuthemail:');
          this.isLoggedin = true;
        }

        return user;
      });*/
  }

  logout() {
    // remove user from local storage to log user out
    setTimeout(() => this.isLoggedin = false, 50);
    this.userAuthSrv.removeCurrentUser();
    //localStorage.removeItem('currentUser');
  }

  getCurrentUserJwt(): string {
   // if (this.isLoggedin) {
      const userItem = localStorage.getItem('currentUser');

      if (userItem !== 'undefined') {
        const userAuth = JSON.parse(userItem);
        if (!userAuth) {
          console.log('userAuth is null -> return null');
          return null;
        } else {
       //   console.log('userAuthemail:' + userAuth.token);
        }
        // console.dir(userAuth);
        return userAuth.token;
      }
  }

  getCurrentUsername(): string {
    // if (this.isLoggedin) {
    const userItem = localStorage.getItem('currentUser');
   // console.dir(userItem);
    if (userItem !== 'undefined') {
      const userAuth = JSON.parse(userItem);
      if (!userAuth) {
        console.log('userAuth is null');
        return null;
      } else {
     //   console.log('usermail:' + userAuth.email);
      }
      // console.dir(userAuth);
      return userAuth.email;
    }
  }
}
