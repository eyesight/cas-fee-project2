import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { UserContentDbService } from '../_services/user-content-db.service';

@Component({
  selector: 'app-personal-details-container',
  templateUrl: './personal-details-container.component.html'
})
export class PersonalDetailsContainerComponent implements OnInit {
  userContent: User;

  constructor(
    private UserContentDbService: UserContentDbService
  ) { }

  ngOnInit() {
    this.userContent = this.UserContentDbService.getCurrentUser();
  }

}
