/**
 * Created by awedag on 20.11.17.
 */


import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { appConfig } from '../_helpers/app.config';
import {User, UserAuth} from '../_models/user.model';
import {UserAuthService} from "./user-auth.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HttpWrapper {
  constructor( private http: Http, private userAuth: UserAuthService) {

  }

  public get(url: string): any {

   /* return Observable.create((observer) => {
      observer.next(this.http.get(appConfig.apiUrl + url, this.jwt()).map((response: Response) => response.json() ));
      console.log('http-wrapper get');
      observer.complete();
    });*/

    return this.http.get(appConfig.apiUrl + url, this.jwt()).map((response: Response) => response.json() );
  }

  public postNoJWT(url: string, data: any): any {
/*
    return Observable.create((observer) => {
      observer.next(this.http.post(appConfig.apiUrl + url, data).map((response: Response) => response.json() ));
      console.log('http-wrapper post No JWT');
      observer.complete();
    });*/
    return this.http.post(appConfig.apiUrl + url, data).map((response: Response) => response.json());
  }
  /* public post(url: string, data: any) {
    return super.post(appConfig.apiUrl + url, data, this.jwt()).map((response: Response) => response.json());
  }

  public put(url: string, data: any) {
    return super.put(appConfig.apiUrl + url, data, this.jwt()).map((response: Response) => response.json());
  }
  public delete(url: string, ) {
    return super.put(appConfig.apiUrl + url, this.jwt()).map((response: Response) => response.json());
  }
*/

  private jwt(): string {
    return this.userAuth.getCurrentUserJwt();
  }
}

