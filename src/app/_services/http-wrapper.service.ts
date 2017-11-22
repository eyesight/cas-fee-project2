/**
 * Created by awedag on 20.11.17.
 */


import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { appConfig } from '../_helpers/app.config';
import {User, UserAuth, UserPwd} from '../_models/user.model';
import {UserAuthService} from './user-auth.service';
import {Observable} from "rxjs/Observable";

// TODO: try to extend from http (didnt work in the first step, probably need to implement more functions

@Injectable()
export class HttpWrapper {
  constructor( private http: Http, private userAuthSrv: UserAuthService) {

  }

  public get(url: string): any {
    return this.http.get(appConfig.apiUrl + url, this.jwt()).map((response: Response) => response.json() );
  }

  public postNoJWT(url: string, data: any): any {
    console.log('postNoJWT' + appConfig.apiUrl + url);
    return this.http.post(appConfig.apiUrl + url, data).map((response: Response) => response.json());
  }

  public post(url: string, data: any) {
    return this.http.post(appConfig.apiUrl + url, data, this.jwt()).map((response: Response) => response.json());
  }

  public put(url: string, data: any) {
    return this.http.put(appConfig.apiUrl + url, data, this.jwt()).map((response: Response) => response.json());
  }
  public delete(url: string, ) {
    return this.http.put(appConfig.apiUrl + url, this.jwt()).map((response: Response) => response.json());
  }


  private jwt(): RequestOptions {
    const userJwt: string = this.userAuthSrv.getCurrentUserJwt();
    if (userJwt) {
      const headers = new Headers({ 'Authorization': 'Bearer ' + userJwt });
      console.log('jwt: '+ headers);
      return new RequestOptions({ headers: headers });
    }
  }
}

