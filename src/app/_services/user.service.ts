import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { appConfig } from '../_helpers/app.config';
import { User } from '../_models/user.model';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  getAll() {
    return this.http.get(appConfig.apiUrl + '/api/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get(appConfig.apiUrl + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
    console.log('user.service: ' + user);
    return this.http.post(appConfig.apiUrl + '/api/register', user, this.jwt()).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.http.put(appConfig.apiUrl + '/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
  }

  delete(id: number) {
    return this.http.delete(appConfig.apiUrl + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  // private helper methods

  private jwt() {
    // create authorization header with jwt token
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
      console.log('jwt: '+ headers);
      return new RequestOptions({ headers: headers });
    }
  }
}
