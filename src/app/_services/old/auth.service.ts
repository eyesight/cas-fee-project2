import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {
  isAuthenticated: boolean = false;
  constructor(private http: Http) { }

  authenticateNow(usercreds) {
    let headers = new Headers();
    let creds = 'name=' + usercreds.username + '&password=' + usercreds.password;

    this.http.post('/users/authenticate', creds, {headers: headers}).subscribe((data) => {
        if(data.json().success) {
          window.localStorage.setItem('auth_key', data.json().token);
          this.isAuthenticated = true;
        }
      }
    )};
  }
