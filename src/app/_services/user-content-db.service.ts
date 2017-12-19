/**
 * Created by awedag on 20.11.17.
 */

import {Injectable} from '@angular/core';
import {StorageService, StorageKeys} from './storage.service';

import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {appConfig} from '../_helpers/app.config';
import {User} from '../_models/user.model';
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";


@Injectable()
export class UserContentDbService {


  private storageObserver: Subscription;
  private subject = new Subject<User>();

  private userContentCache: User = null;

  constructor(private storage: StorageService) {
    console.log('User-UserContentDbService constructed');
  }

  public saveCurrentUser(data: User) {
    this.userContentCache = data;
    console.log('storage');
    console.log(this.userContentCache);
    this.storage.write(StorageKeys.keyCurrentUserContent, data);
    this.subject.next(data);

  }

  public removeCurrentUser() {
    this.userContentCache = null;
    this.storage.remove(StorageKeys.keyCurrentUserContent);
  }

  public getCurrentUserObserver(): Observable<User> {
    return new Observable((observer) => {
      try {
        const userContent = this.getCurrentUser();
        if (userContent) {
          observer.next(userContent);

        } else {
          this.subject.asObservable().subscribe((content) => {
              console.log('getCurrentUserObserver.subscribe:length of av:' + content);
              observer.next(content);
            }
            ,
            (error) => {
              observer.error(error);
            });
        }
      } catch (e) {
        observer.error(e);
      }
      // remove observable
      return () => {
        // nothing to execute
      };
    });


    /*
     return new Promise((resolve, reject) => {
     try {
     const userContent = this.getCurrentUser();
     if ( userContent ) {
     resolve(userContent);

     } else {
     this.subject.asObservable().subscribe((content) => {
     console.log('getCurrentUserObserver.subscribe:length of av:' + content);
     resolve(content);
     },
     (error) => {
     reject(error);
     });
     }
     } catch (e) {
     reject(e);
     }
     });
     * */
  }


  public getCurrentUser(): User {
    // console.log('userContentGetCurrentUser:' + this.userContentCache);
    if (!this.userContentCache) {
      this.userContentCache = this.storage.read(StorageKeys.keyCurrentUserContent);
      console.log('userContentGetCurrentUserund jetzt:' + this.userContentCache);

      return this.userContentCache;
    } else {
      return this.userContentCache;
    }
  }


}
