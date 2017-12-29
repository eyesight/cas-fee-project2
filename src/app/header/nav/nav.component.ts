import {Component, OnInit} from '@angular/core';
import {Route} from '@angular/router';
import {ROUTES} from '../../app.routes';
import {User} from '../../_models/user.model';
import {UserContentService} from "../../_services/user-content.service";
import {avatarHeader} from "../../_helpers/avatar-header";
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  public navItems: Route[];
  public userContent: User;
  public userAvatar: string;

  constructor(private userContentService: UserContentService) {
    this.navItems = ROUTES.filter((route) => route.data);
  }

  ngOnInit() {
    console.log('nav.component ngOnInit');
    this.userContent = null;
    this.userContentService.getCurrentUserObserver().subscribe((userContent) => {
      console.log('nav.component ngOnInit inside observer');
      this.userContent = userContent;
     // this.userAvatar = 'data:image/png;base64,' + this.userContent.user_avatar;
      this.userAvatar =  avatarHeader(this.userContent.avatar_filetype) + this.userContent.user_avatar;

    }, (error) => {
      console.log('observer error on nav.component.getCurrentUserObserver:' + error );
    });
  }
}
