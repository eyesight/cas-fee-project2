import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user.model';
import {UserContentService} from "../_services/user-content.service";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userContent: User;

  constructor(private UserContentService: UserContentService) {
  }

  ngOnInit() {
    // get new data when child-components update data
    this.UserContentService.getCurrentUserObserver().subscribe((data) => {
      this.userContent = data;
     });
  }
}
