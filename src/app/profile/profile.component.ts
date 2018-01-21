import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../_models/user.model';
import {UserContentService} from '../_services/user-content.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  public userContent: User;
  public isTeacher = false;

  private userContentSub: Subscription = null;
  constructor(private UserContentService: UserContentService) {
  }

  public ngOnInit() {

    if (this.userContentSub) {
      this.userContentSub.unsubscribe();
    }
    // get new data when child-components update data
    this.userContentSub = this.UserContentService.getCurrentUserObserver().subscribe((data) => {
      this.userContent = data;
     });
    // check if User is teacher or not
    this.isTeacher = (this.userContent.is_teacher === 1);
  }
  public ngOnDestroy() {
    if (this.userContentSub) {
      this.userContentSub.unsubscribe();
    }
  }
}
