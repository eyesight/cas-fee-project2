import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserAuth, UserPwd } from '../_models/user.model';
import { appConfig } from '../_helpers/app.config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  isLoggedin: boolean = false;
  constructor(private http: Http) { }

  login(username: string, password: string) {
    console.log('username:' + username);
    // JSON.stringify({ email: username, pwd: password })


    /*
    *
     {

     "class_id" : 12,
     "user_name" : "nice USEreNAme",
     "parent_surname" : "Blass",
     "parent_forename": "bl",
     "child_surname" : "adlöfjk",
     "child_forename": "adsf",
     "child_gender" : "m",
     "child_date_of_birth" : "1999-10-10",
     "adress": "HAldenstrasse",
     "zip": "8000" ,
     "place":"Zürich",
     "is_active":1

     }
    * */
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const json = { email: username, pwd: password };
    const body = { name: 'Brads', email: 'emaisl@example.com', pwd: 'bla' };
    const userPwd = new UserPwd(username, password);
    console.log('JSON: ' + json.email + 'body:' + body);
    // return this.http.post('http://localhost:3020/api/authenticate', json )

// instaed of json use JSON.strinfiy
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
      });
  }

  logout() {
    // remove user from local storage to log user out
    setTimeout(() => this.isLoggedin = false, 50);
    localStorage.removeItem('currentUser');
  }

  getCurrentUserJwt(): string {
   // if (this.isLoggedin) {
      const userItem = localStorage.getItem('currentUser');
      //console.dir(userItem);
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
