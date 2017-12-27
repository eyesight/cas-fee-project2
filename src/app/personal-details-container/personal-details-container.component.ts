import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import {UserContentService} from '../_services/user-content.service';


@Component({
  selector: 'app-personal-details-container',
  templateUrl: './personal-details-container.component.html'
})
export class PersonalDetailsContainerComponent implements OnInit {
  public userContent: User = null;

  constructor(
    private UserContentService: UserContentService
  ) { }

  ngOnInit() {
    // get new data when child-components update data
    this.UserContentService.getCurrentUserObserver().subscribe((data) => {
      this.userContent = data;
    });
  }

}
