import {Component, OnDestroy, OnInit} from '@angular/core';
import {Route, Router} from '@angular/router';
import {ROUTES} from '../../app.routes';
import {User} from '../../_models/user.model';
import {UserContentService} from '../../_services/user-content.service';
import {avatarHeader} from '../../_helpers/avatar-header';
import {AuthenticationService} from '../../_services/index';
import {ClasslistAvatarService} from '../../_services/user-classlist-avatars.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})

export class NavComponent implements OnInit, OnDestroy {
  public navItems: Route[];
  public userContent: User;
  public userAvatar: string;
  private userContentSub: Subscription = null;

  constructor(
    private userContentService: UserContentService,
    private authenticationService: AuthenticationService,
    private classlistAvatarService: ClasslistAvatarService,
    private router: Router  ) {
      this.navItems = ROUTES.filter((route) => route.data);
  }

  public ngOnInit() {
    this.userContent = null;
    if (this.userContentSub) {
      this.userContentSub.unsubscribe();
    }
    this.userContentSub = this.userContentService.getCurrentUserObserver().subscribe((userContent) => {
      this.userContent = userContent;
      if (this.userContent.user_avatar) {
        this.userAvatar =  avatarHeader(this.userContent.avatar_filetype) + this.userContent.user_avatar;
      } else {
        console.log('no avatar available');
      }

    }, (error) => {
      console.log('observer error on nav.component.getCurrentUserObserver:' + error );
    });
  }

  public ngOnDestroy() {
    if (this.userContentSub) {
      this.userContentSub.unsubscribe();
    }
  }

  public logout() {
    this.authenticationService.logout();
    this.userContentService.clear();
    this.classlistAvatarService.clear();
    this.router.navigate(['login']);
  }
}
