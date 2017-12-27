/**
 * Created by awedag on 27.11.17.
 */
import {Inject, Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User, UserAuth, UserPwd} from '../_models/user.model';
import {appConfig} from '../_helpers/app.config';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from './http-wrapper.service';
import {DbService} from "./db.service";
import {StorageKeys, StorageService} from "./storage.service";

@Injectable()
export class DbServiceUserContent extends  DbService<User> {
  constructor(@Inject(StorageService) storage) {
    super(storage, StorageKeys.keyCurrentUserContent);
  }
}

@Injectable()
export class UserContentService {
  isLoggedin: boolean = false;

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
    // console.log('userContentGetCurrentUser:' + this.userContentCache);
   return this.dbUserContent.getCurrentData();
  }



  // generateUpdatedUser(currentUserObject) {
  //   let id = currentUserObject.id;
  //   let email = currentUserObject.email;
  //   let class_id = currentUserObject.class_id;
  //   let user_name =  currentUserObject.user_name;
  //   let parent_surname = currentUserObject.parent_surname;
  //   let parent_forename = currentUserObject.parent_forename;
  //   let parent_gender = currentUserObject.parent_gender;
  //   let parent_language = currentUserObject.parent_language;
  //   let child_surname = currentUserObject.child_surname;
  //   let child_forename = currentUserObject.child_forename;
  //   let child_gender = currentUserObject.child_gender;
  //   let child_date_of_birth = currentUserObject.child_date_of_birth;
  //   let adress = currentUserObject.adress;
  //   let zip = currentUserObject.zip;
  //   let place = currentUserObject.place;
  //   let tel_private = currentUserObject.tel_private;
  //   let tel_office = currentUserObject.tel_office;
  //   let is_active = currentUserObject.is_active;
  //   let is_teacher = currentUserObject.is_teacher;
  //   let is_admin = currentUserObject.is_admin;
  //   let is_approved = currentUserObject.is_approved;
  //   let user_avatar = currentUserObject.user_avatar;
  //   let user_can = currentUserObject.user_can;
  //
  //   return currentUserObject;
  // }

}
