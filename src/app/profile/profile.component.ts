import {Component, OnInit} from '@angular/core';
import {User} from '../_models/user.model';
import {UserContentDbService} from '../_services/user-content-db.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  public userContent: User;
  public isTeacher: boolean = false;

  constructor(private UserContentDbService: UserContentDbService) {
  }

  ngOnInit() {
    // get new data when child-components update data
    this.UserContentDbService.getCurrentUserObserver().subscribe((data) => {
      this.userContent = data;
     });
    // check if User is teacher or not
    this.isTeacher = (this.userContent.is_teacher === 1);
  }
}
