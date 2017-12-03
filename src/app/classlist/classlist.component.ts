/**
 * Created by awedag on 14.10.17.
 */
import { Component, OnInit } from '@angular/core';
import { Klasse } from '../_models/klasse.model';
import {User} from "../_models/user.model";
import {ClasslistService} from "./service/classlist.service";
import {Router} from "@angular/router";
import {AlertService} from "../_services/alert.service";
import {UserContentDbService} from "../_services/user-content-db.service";
import {UserAuthService} from "../_services/user-auth.service";


@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html'
})
export class ClasslistComponent implements OnInit {

  public classlist: User[] = null;
  public userCurrent: User = null;


  constructor( private classlistService: ClasslistService
    , private router: Router
    , private userAuthService: UserAuthService
    , private userContentDbService: UserContentDbService
    , private alertService: AlertService
  ) { }
  ngOnInit() {
    this.userCurrent = this.userContentDbService.getCurrentUser();

    this.classlistService.getClasslist()
      .subscribe((result) => {
        this.classlist = result;

      });

    /*this.userContentService.getUserContent()
      .subscribe(result => this.userCurrent = result);
*/
  }

  public onChecked(checked: boolean, item: User) {
    console.log('onChecked in classlist');
    item.is_approved = checked;

  //  item.lastModified = new Date();
  //  this.snackBar.open('checked / unchecked item', null, { duration: 1500 });
  }

}
