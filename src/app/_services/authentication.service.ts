import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
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
    let headers    = new Headers({ 'Content-Type': 'application/json' });
    let options    = new RequestOptions({ headers: headers });
    const json =  JSON.stringify({ email: 'username', pwd: 'password' });
    console.log('JSON: ' + json);
    return this.http.post('http://localhost:3020/api/authenticate', '{email:"username", pwd:"asdf", KEY: 12 }' )

    //return this.http.post('http://localhost:3020/api/authenticate', "{ \"email\": username, \"pwd\": password }" )
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isLoggedin = true;
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    //TODO: Solve Bug https://github.com/angular/angular/issues/17572
    this.isLoggedin = false;
    localStorage.removeItem('currentUser');
  }
}
