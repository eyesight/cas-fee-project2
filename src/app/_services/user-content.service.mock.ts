import {Injectable} from '@angular/core';
import {User} from '../_models/user.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from './http-wrapper.service';
import {DbServiceUserContent} from './user-content.service';


@Injectable()
export class UserContentServiceMock {

  constructor(
    private httpWrp: HttpWrapper,
    private dbUserContent: DbServiceUserContent) {
  }

  public getUserContent(): Observable<User> {

// instead of json use JSON.strinfiy
    return this.httpWrp.get('/assets/mock/userContent.mock.json')
      .map((userContent: User) => {
        if (userContent) {
          this.dbUserContent.saveCurrentData(userContent);
        }
        return userContent;
      });
  }


  public clear() {
    this.dbUserContent.removeCurrentData();
  }

  public getCurrentUserObserver(): Observable<User> {
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
   return this.dbUserContent.getCurrentData();
  }

}
