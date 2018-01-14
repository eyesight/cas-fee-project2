
import {Inject, Injectable} from '@angular/core';
import {User} from '../_models/user.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from './http-wrapper.service';
import {DbService} from './db.service';
import {StorageKeys, StorageService} from './storage.service';

@Injectable()
export class DbServiceUserContent extends  DbService<User> {
  constructor(@Inject(StorageService) storage) {
    super(storage, StorageKeys.keyCurrentUserContent);
  }
}

@Injectable()
export class UserContentService {

  constructor( private httpWrp: HttpWrapper, private dbUserContent: DbServiceUserContent) {
    console.log('UserContentService constructed');
  }

  public getUserContent(): Observable<User> {

// instead of json use JSON.strinfiy
    return this.httpWrp.get('/api/user/contents')
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
    return this.dbUserContent.getCurrentDataObserver();
  }

  public getCurrentUser(): User {
   return this.dbUserContent.getCurrentData();
  }

}
