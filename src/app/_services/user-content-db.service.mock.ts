import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {User} from '../_models/user.model';

@Injectable()
export class UserContentDbServiceMock {

  private userContentCache: User = new User;

  constructor(private storage: StorageService) {
    this.userContentCache.email = 'test@test.com';

  }

  public saveCurrentUser(data: User) {
    this.userContentCache = data;
  }

  public removeCurrentUser() {
  }

  public getCurrentUser(): User {
    if (!this.userContentCache) {
      return this.userContentCache || null;
    } else {
      return this.userContentCache;
    }
  }
}
