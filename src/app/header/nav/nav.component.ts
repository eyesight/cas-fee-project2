import {Component, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {ROUTES} from '../../app.routes';
import {UserContentDbService} from "../../_services/user-content-db.service";
import {User} from "../../_models/user.model";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  public navItems: Route[];
  public userContent: User;
  public userAvatar: string;

  constructor(private userContentDbService: UserContentDbService) {
    this.navItems = ROUTES.filter((route) => route.data);
    // console.dir(this.navItems);
  }

  ngOnInit() {
    console.log('nav.component ngOnInit');
    this.userContent = null;
    this.userContentDbService.getCurrentUserObserver().subscribe((userContent) => {
      console.log('nav.component ngOnInit inside observer');
      this.userContent = userContent;
      this.userAvatar = 'data:image/png;base64,' + this.userContent.user_avatar;

    }, (error) => {
      console.log('observer error on nav.component.getCurrentUserObserver:' + error );
    });
  }
}


/*
*  this.userContentDbService.getCurrentUserObserver().then((userContent) => {
 console.log('nav.component ngOnInit inside promise.then');
 this.userContent = userContent;
 this.userAvatar = 'data:image/png;base64,' + this.userContent.user_avatar;

 })
 .catch((err) => {
 console.log('Promise reject on nav.component.getCurrentUserPromise:' + err );
 });*/
