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
export class DbService<T> {


  private storageObserver: Subscription;
  private subject = new Subject<T>();

  private contentCache: T = null;

  constructor(private storage: StorageService, private storageKey: string) {
    console.log('DbService constructed for key: ' + this.storageKey);
  }

  public saveCurrentData(data: T) {
    this.contentCache = data;
    console.log('storage');
    console.log(this.contentCache);
    this.storage.write(this.storageKey, data);
    this.subject.next(data);

  }

  public removeCurrentData() {
    this.contentCache = null;
    this.storage.remove(this.storageKey);
  }

  public getCurrentDataObserver(): Observable<T> {
    return new Observable((observer) => {
      try {
        // check if data is already available -> next it
        const content = this.getCurrentData();
        if (content) {
          observer.next(content);
        }
        this.subject.asObservable().subscribe((dataContent) => {
            console.log('getCurrentDataObserver.subscribe:length of av:' + dataContent);
            observer.next(dataContent);
          }
          ,
          (error) => {
            observer.error(error);
          });
      } catch (e) {
        observer.error(e);
      }
      // remove observable
      return () => {
        // nothing to execute
      };
    });
  }


  public getCurrentData(): T {
    // console.log('userContentGetCurrentData:' + this.contentCache);
    if (!this.contentCache) {
      this.contentCache = this.storage.read(this.storageKey);
      console.log('contentGetCurrentUserund jetzt:' + this.contentCache);

      return this.contentCache;
    } else {
      return this.contentCache;
    }
  }


}
