import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { UserContentDbService } from '../_services/user-content-db.service';
import { ProfileService } from './service/profile.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userContent: User;

  constructor(
    private UserContentDbService: UserContentDbService,
    private profileService: ProfileService) { }


  ngOnInit() {
    this.userContent = this.UserContentDbService.getCurrentUser();
    // get new data when child-components update data
    this.profileService.getData().subscribe(data => {
        this.userContent = data;
      });
  }
}
