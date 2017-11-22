import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { appConfig } from '../_helpers/app.config';
import { User } from '../_models/user.model';
import {HttpWrapper} from './http-wrapper.service';

@Injectable()
export class UserService {
  constructor(private httpWrp: HttpWrapper) { }

  getAll() {
    return this.httpWrp.get('/api/users');
  }

  getById(id: number) {
    return this.httpWrp.get('/api/users/' + id);
  }

  create(user: User) {
    console.log('create user');
    return this.httpWrp.postNoJWT('/api/register', user);
  }

  update(user: User) {
    return this.httpWrp.put('/api/users/' + user.id, user);
  }

  /*delete(id: number) {
    return this.http.delete(appConfig.apiUrl + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }*/

  public showKlasses() {
    console.log('getClasses user.service:' + appConfig.apiUrl + '/klasse');
    return this.httpWrp.get('/klasse');
  }

  // private helper methods

 /* private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      console.log('jwt: '+ headers);
      return new RequestOptions({ headers: headers });
    }
  }*/
}
