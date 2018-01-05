import {Inject, Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User, UserAuth, UserPwd} from '../_models/user.model';
import {appConfig} from '../_helpers/app.config';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from './http-wrapper.service';
import {DbService} from "./db.service";
import {StorageKeys, StorageService} from "./storage.service";
import {DbServiceUserContent} from "./user-content.service";


@Injectable()
export class UserContentServiceMock {
  isLoggedin: boolean = false;

  constructor( private httpWrp: HttpWrapper, private dbUserContent: DbServiceUserContent) {
    console.log('UserContentService constructed');

  }

  public getUserContent(): Observable<User> {

// instead of json use JSON.strinfiy
    return this.httpWrp.get('/assets/mock/userContent.mock.json')
      .map((userContent: User) => {
        if (userContent) {
          // console.dir(userContent);
          this.dbUserContent.saveCurrentData(userContent);
        }
        return userContent;
      });
  }


  public clear() {
    this.dbUserContent.removeCurrentData();
  }

  public getCurrentUserObserver(): Observable<User> {
   // return this.dbUserContent.getCurrentDataObserver();

    return new Observable((observer) => {
      try {
        // check if data is already available -> next it
        const content = this.httpWrp.get('/assets/mock/userContent.mock.json');

        if (content) {
          observer.next(content);
        }

      } catch (e) {
        observer.error(e);
      }
      // remove observable
      return () => {
        // nothing to execute
      };
    });
  }


  public getCurrentUser(): User {
    // console.log('userContentGetCurrentUser:' + this.userContentCache);
   return this.dbUserContent.getCurrentData();
  }

}
