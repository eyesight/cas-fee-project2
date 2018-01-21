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
  }

  public saveCurrentData(data: T) {
    this.contentCache = data;
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
      return this.contentCache;
    } else {
      return this.contentCache;
    }
  }
}

