import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../_models/user.model';
import {ClasslistService} from './service/classlist.service';
import {Router} from '@angular/router';
import {AlertService} from '../_services/alert.service';
import {UserContentService} from '../_services/user-content.service';
import {ClasslistAvatarService} from '../_services/user-classlist-avatars.service';
import {Subscription} from 'rxjs/Subscription';
import {AlertMessagesService} from '../_services/alert-messages.service';


@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html'
})
export class ClasslistComponent implements OnInit, OnDestroy {

  public classlist: User[] = null;
  public userCurrent: User = null;

  public canDeactivate = true;
  public avatarSub: Subscription = null;
  public classlistAvatars: Subscription = null;
  public userContentSub: Subscription = null;

  constructor(private classlistService: ClasslistService
    , private router: Router
    , private alertService: AlertService
    , private alertMessagesService: AlertMessagesService
    , private userContentService: UserContentService
    , private classlistAvatarService: ClasslistAvatarService) {
  }

  ngOnInit() {
   this.userContentSub =  this.userContentService.getCurrentUserObserver()
      .subscribe((uc) => {
        this.userCurrent = uc;
        if (!this.userCurrent) {
          this.alertService.error(this.alertMessagesService.MessagesError.newlogin);
          setTimeout(() =>
            this.router.navigate(['relogin'], {queryParams: {returnUrl: this.router.url}}), 3500);
          return;
        }
      });

    this.classlistAvatars = this.classlistService.getClasslist()
      .subscribe((result) => {
          this.classlist = result;
          console.log(result);

          this.avatarSub = this.classlistAvatarService.getClasslistAvatars()
            .subscribe((resultAvatars) => {
                resultAvatars.filter((x) => x !== null)
                  .map((x) => {

                    if (x.email != null && x.avatar != null) {
                      const item = this.classlist.findIndex(el => el.email === x.email);
                      console.log('classlist: item:' + item + ':email:' + this.classlist[item].email);
                      this.classlist[item].user_avatar = x.avatar;
                    }
                  });
              },
              (error) => {
                console.log('ClasslistComponent getClasslistAvatars: error:' + error);
                this.alertService.error(this.alertMessagesService.MessagesError.avatarNotLoaded);
              });
        },
        (error) => {
          console.log('ClasslistComponent classlist.component call authentication:' + error);
          this.alertService.error(this.alertMessagesService.MessagesError.newlogin);

          setTimeout(() =>
            this.router.navigate(['relogin'], {queryParams: {returnUrl: this.router.url}}), 3500);
        });
  }

  ngOnDestroy() {
    this.avatarSub.unsubscribe();
    this.classlistAvatars.unsubscribe();
    this.userContentSub.unsubscribe();
  }

  public approveAnswer(val: boolean) {
    this.canDeactivate = val;
  }

}
