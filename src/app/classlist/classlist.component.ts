/**
 * Created by awedag on 14.10.17.
 */
import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UserClassListAvatars} from "../_models/user.model";
import {ClasslistService} from "./service/classlist.service";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {UserAuthService} from "../_services/user-auth.service";
import {UserContentService} from "../_services/user-content.service";
import {ClasslistAvatarService} from "../_services/user-classlist-avatars.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html'
})
export class ClasslistComponent implements OnInit, OnDestroy {

  public classlist: User[] = null;
  public userCurrent: User = null;

  public canDeactivate = true;
  public avatarSub: Subscription;


  constructor(private classlistService: ClasslistService
    , private router: Router
    , private userAuthService: UserAuthService
    , private alertService: AlertService
    , private userContentService: UserContentService
  , private classlistAvatarService: ClasslistAvatarService) {
  }

  ngOnInit() {
     this.userContentService.getCurrentUserObserver()
      .subscribe((uc) => {
        this.userCurrent = uc;
        if (!this.userCurrent) {
          this.alertService.error('Sie müssen sich neu anmelden');
          setTimeout(() =>
            this.router.navigate(['login'], {queryParams: {returnUrl: this.router.url}}), 3500);
          return;
        }
      });

    // console.log('this.userCurrent und jetzt:' + this.userCurrent.user_avatar);

    this.classlistService.getClasslist()
      .subscribe((result) => {
          this.classlist = result;

          this.avatarSub = this.classlistAvatarService.getClasslistAvatars()
            .subscribe((resultAvatars) => {
                console.log('result:' + resultAvatars.length);
                resultAvatars.filter((x ) => x !== null)
                  .map((x) => {
                    console.log('classlistavatars in subscribe: ' + x.email);
                    console.log('content avatars: length:' + x.avatar.length);
                    if (x.email != null && x.avatar != null) {
                      const item = this.classlist.findIndex(el => el.email === x.email);
                      console.log('classlist: item:' + item + ':email:' + this.classlist[item].email);
                      this.classlist[item].user_avatar = 'data:image/png;base64,' + x.avatar;
                    }
                  });
              },
              (error) => {
                console.log('getClasslistAvatars: error:' + error);
                this.alertService.error('Die Profilbilder können nicht geladen werden');
              });
        },
        (error) => {
          console.log('classlist.component call authentication:' + error);
          this.alertService.error('Sie müssen sich neu anmelden');
          setTimeout(() =>
            this.router.navigate(['login'], {queryParams: {returnUrl: this.router.url}}), 3500);
        });
  }

  ngOnDestroy(){
    this.avatarSub.unsubscribe();
  }

  public approveAnswer(val: boolean) {
    console.log('approveAnswer in maincomponent:' + val);
    this.canDeactivate = val;
  }

  /*
   public onChecked(checked: boolean, item: User) {
   console.log('onChecked in classlist');
   item.is_approved = checked;
   */
  // this.classlistService.approveUser(checked)
  //   .subscribe((x) => {console.log('approved')} );
  //  item.lastModified = new Date();
  //  this.snackBar.open('checked / unchecked item', null, { duration: 1500 });
  // }

}
