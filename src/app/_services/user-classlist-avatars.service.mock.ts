
import {Injectable} from '@angular/core';
import {UserClassListAvatars} from '../_models/user.model';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {HttpWrapper} from './http-wrapper.service';
import {UserContentService} from './user-content.service';
import {avatarHeader} from '../_helpers/avatar-header';
import {DbServiceClasslistAvatar} from './user-classlist-avatars.service';


export class AvatarConfig {
  filetype: string;
  avatarHeader: string;
}

export const avatarFileTypes: AvatarConfig[] = [
  {filetype: 'png', avatarHeader: 'data:image/png;base64,'},
  {filetype: 'jpg', avatarHeader: 'data:image/jpg;base64,'}
];


@Injectable()
export class ClasslistAvatarServiceMock {

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
      return this.httpWrp.get('/assets/mock/messageJson.json')
        .map((userAvatar: UserClassListAvatars[]) => {
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

  private prepareAvatars(avatars: UserClassListAvatars[]): UserClassListAvatars[] {
    avatars
      .filter((x) => x !== null)
      .map((x) => {
        x.avatar = avatarHeader(x.avatar_filetype) + x.avatar;
    });
    return avatars;
  }
}
