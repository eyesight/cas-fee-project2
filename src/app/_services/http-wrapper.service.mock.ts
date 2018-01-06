

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { appConfig } from '../_helpers/app.config';
import {User, UserAuth, UserPwd} from '../_models/user.model';
import {UserAuthService} from './user-auth.service';
import {Observable} from "rxjs/Observable";

// better not to extend from Http

@Injectable()
export class HttpWrapperServiceMock {
  constructor( private http: Http, private userAuthSrv: UserAuthService) {

  }

  public get(url: string): Observable<any> {

    console.log('http wrapper mock');
    return this.http.get('/assets/mock/messageJson.json');

/*
      const observable = new Observable(observer => {

      console.log('http wrapper mock');
      this.http.get('/assets/mock/messageJson.json').subscribe((result) => {
        console.dir(result);
        observer.next(result);
      });


      return () => {
        //    this.scktWrp.close();
      };
    });
  return observable;*/
  }

  public postNoJWT(url: string, data: any): any {
    console.log('postNoJWT' + appConfig.apiUrl + url);
    return  [{email : 'testemail@com.ex', token : 'TESTTOKEN' }];

   // return this.http.post(appConfig.apiUrl + url, data).map((response: Response) => response.json());
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
      //console.log('jwt: '+ headers);
      return new RequestOptions({ headers: headers });
    }
  }
}

