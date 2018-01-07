import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UserClassListAvatars} from '../_models/user.model';
import {ClasslistService} from './service/classlist.service';
import {Router} from '@angular/router';
import {AlertService} from '../_services/alert.service';
import {UserContentService} from '../_services/user-content.service';
import {ClasslistAvatarService} from '../_services/user-classlist-avatars.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html'
})
export class ClasslistComponent implements OnInit, OnDestroy {

  public classlist: User[] = null;
  public userCurrent: User = null;

  public canDeactivate = true;
  public avatarSub: Subscription;
  public classlistAvatars: Subscription;

  constructor(private classlistService: ClasslistService
    , private router: Router
    , private alertService: AlertService
    , private userContentService: UserContentService
    , private classlistAvatarService: ClasslistAvatarService) {
  }

  ngOnInit() {
    this.userContentService.getCurrentUserObserver()
      .subscribe((uc) => {
        this.userCurrent = uc;
        if (!this.userCurrent) {
          this.alertService.error('newlogin');
          setTimeout(() =>
            this.router.navigate(['relogin'], {queryParams: {returnUrl: this.router.url}}), 3500);
          return;
        }
      });

    this.classlistService.getClasslist()
      .subscribe((result) => {
          this.classlist = result;

          this.avatarSub = this.classlistAvatarService.getClasslistAvatars()
            .subscribe((resultAvatars) => {
                console.log('result:' + resultAvatars.length);
                resultAvatars.filter((x) => x !== null)
                  .map((x) => {
                    console.log('classlistavatars in subscribe: ' + x.email);
                    console.log('content avatars: length:' + x.avatar.length);
                    if (x.email != null && x.avatar != null) {
                      const item = this.classlist.findIndex(el => el.email === x.email);
                      console.log('classlist: item:' + item + ':email:' + this.classlist[item].email);
                      this.classlist[item].user_avatar = x.avatar;
                    }
                  });
              },
              (error) => {
                console.log('getClasslistAvatars: error:' + error);
                this.alertService.error('avatarNotLoaded');
              });
        },
        (error) => {
          console.log('classlist.component call authentication:' + error);
          this.alertService.error('newlogin');

          setTimeout(() =>
            this.router.navigate(['relogin'], {queryParams: {returnUrl: this.router.url}}), 3500);
        });
  }

  ngOnDestroy() {
    if (this.avatarSub) {
      this.avatarSub.unsubscribe();
    }
  }

  public approveAnswer(val: boolean) {
    console.log('approveAnswer in maincomponent:' + val);
    this.canDeactivate = val;
  }

}
