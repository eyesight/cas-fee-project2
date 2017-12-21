/**
 * Created by awedag on 14.10.17.
 */
import {Component, OnInit} from '@angular/core';
import {Klasse} from '../_models/klasse.model';
import {User} from "../_models/user.model";
import {ClasslistService} from "./service/classlist.service";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {UserContentDbService} from "../_services/user-content-db.service";
import {UserAuthService} from "../_services/user-auth.service";
import {UserContentService} from "../_services/user-content.service";


@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html'
})
export class ClasslistComponent implements OnInit {

  public classlist: User[] = null;
  public userCurrent: User = null;

  public canDeactivate = true;


  constructor(private classlistService: ClasslistService
    , private router: Router
    , private userAuthService: UserAuthService
    , private userContentDbService: UserContentDbService
    , private alertService: AlertService
    , private userContentService: UserContentService,) {
  }

  ngOnInit() {
    this.userCurrent = this.userContentDbService.getCurrentUser();

    // console.log('this.userCurrent und jetzt:' + this.userCurrent.user_avatar);

    if (!this.userCurrent) {
      this.alertService.error('Sie müssen sich neu anmelden', false, 1000);
      setTimeout(() =>
        this.router.navigate(['login'], {queryParams: {returnUrl: this.router.url}}), 1000);
      return;
    }

    this.classlistService.getClasslist()
      .subscribe((result) => {
          this.classlist = result;
        },
        (error) => {
          console.log('chat.component call authentication:' + error);
          this.alertService.error('Sie müssen sich periodisch neu anmelden', false, 1000);
          setTimeout(() =>
            this.router.navigate(['login'], {queryParams: {returnUrl: this.router.url}}), 1000);
        });

    setTimeout(() => {
      console.log('read avatars ');
      this.classlistService.getClasslistAvatars()
        .subscribe((result) => {
            console.log('result:' + result.length);
            result.filter((x) => x !== null)
              .map((x) => {
                console.log('classlistavatars in subscribe: ' + x.email);
                console.log('content avatars: length:' + x.avatar.length)
                if (x.email != null && x.avatar != null) {
                  const item = this.classlist.findIndex(el => el.email === x.email);
                  console.log('classlist: item:' + item + ':email:' + this.classlist[item].email);
                  this.classlist[item].user_avatar = 'data:image/png;base64,' + x.avatar;
                }
              });

          },
          (error) => {
            console.log('getClasslistAvatars: chat.component call authentication:' + error);
            this.alertService.error('Die Profilbilder können nicht geladen werden', false, 1000);
          });

    }, 5000);

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
