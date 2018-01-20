import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class DbService<T> {

  private subject = new Subject<T>();

  private contentCache: T = null;

  constructor(
    private storage: StorageService,
    public storageKey: string) {
    console.log('DbService constructed for key: ' + this.storageKey);
  }

  public saveCurrentData(data: T) {
    this.contentCache = data;
    console.log('storage for key:' + this.storageKey);
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
    if (!this.contentCache) {
      this.contentCache = this.storage.read(this.storageKey);
      console.log('contentGetCurrentUserund jetzt:' + this.contentCache);

      return this.contentCache;
    } else {
      return this.contentCache;
    }
  }
}

