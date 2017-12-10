import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Rx';
import { User } from '../../_models/user.model';


@Injectable()
export class ProfileService {
  private dataObs = new Subject<User>();

  getData() {
    return this.dataObs;
  }

  updateData(data: User) {
    this.dataObs.next(data);
  }
}
