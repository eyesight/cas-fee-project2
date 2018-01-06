
import {Inject, Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User, UserAuth, UserClassListAvatars, UserPwd} from '../_models/user.model';
import {appConfig} from '../_helpers/app.config';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from './http-wrapper.service';
import {DbService} from "./db.service";
import {StorageKeys, StorageService} from "./storage.service";
import {UserContentService} from "./user-content.service";
import {avatarHeader} from "../_helpers/avatar-header";


export class AvatarConfig {
  filetype: string;
  avatarHeader: string;
}

export const avatarFileTypes: AvatarConfig[] = [
  {filetype: 'png', avatarHeader: 'data:image/png;base64,'},
  {filetype: 'jpg', avatarHeader: 'data:image/jpg;base64,'}
];

@Injectable()
export class DbServiceClasslistAvatar extends DbService<UserClassListAvatars[]> {
  constructor(@Inject(StorageService) storage) {
    super(storage, StorageKeys.keyCurrentUserClasslistAvatars);
  }
}

@Injectable()
export class ClasslistAvatarService {

  constructor(private httpWrp: HttpWrapper
    , private dbUserClAvatar: DbServiceClasslistAvatar
    , private userContentService: UserContentService) {
    console.log('UserContentService constructed');

    this.userContentService.getCurrentUserObserver().subscribe((userContent) => {
      console.log('nav.component ngOnInit inside observer');

      this.clear();

    }, (error) => {
      console.log('observer error on nav.component.getCurrentUserObserver:' + error);
    });
  }

// TODO: make sure that observable gets removed
  public getClasslistAvatars(): Observable<UserClassListAvatars[]> {

    const clAvatar = this.dbUserClAvatar.getCurrentData();
    if (clAvatar) {

      return new Observable((observer) => {
        try {
          observer.next(clAvatar);
        } catch (e) {
          observer.error(e);
        }
        // remove observable
        return () => {
          // nothing to execute
        };
      });

    } else {
      return this.httpWrp.get('/api/user/classlistavatar')
        .map(result => result.classlistavatar)
        .map(( userAvatar: UserClassListAvatars[]) => {
          if (userAvatar) {
            // console.dir(userContent);
            const avatars = this.prepareAvatars(userAvatar);
            this.dbUserClAvatar.saveCurrentData(avatars);
          }
          return userAvatar;
        });
    }
  }

  public clear() {
    this.dbUserClAvatar.removeCurrentData();
  }

  public getAvatarFromEmail(email: string): Promise<UserClassListAvatars> {
    return new Promise((resolve, reject) => {
      try {
        this.getClasslistAvatars()
          .subscribe((resultAvatar) => {
            resolve(
              resultAvatar.find((x) => {
                if (!x || !x.email) {
                  return false;
                }
                return x.email === email;
              }));
          });
      } catch (e) {
        reject(e);
      }
    });
  }

  private prepareAvatars(avatars: UserClassListAvatars[]): UserClassListAvatars[] {
   // console.dir(avatars[1]);
    avatars
      .filter((x) => x !== null)
      .map((x) => {
        x.avatar = avatarHeader(x.avatar_filetype) + x.avatar;
    });
    return avatars;
  }
}
