import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { UserContentDbService } from '../_services/user-content-db.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userContent: User;

  constructor(
    private UserContentDbService: UserContentDbService
  ) { }

  ngOnInit() {
    // get new data when child-components update data
    this.UserContentDbService.getCurrentUserObserver().subscribe((data) => {
      this.userContent = data;
      console.log('usercontent.avatar:' + this.userContent.avatarP);
    });
  }

  public getAvatar(){
    return  'data:image/png;base64,' + this.userContent.user_avatar;
  }
}
