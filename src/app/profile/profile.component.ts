import { Component, OnInit, OnChanges, Output, Input } from '@angular/core';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { UserContentDbService } from '../_services/user-content-db.service';
import { UserAuthService } from '../_services/user-auth.service';
import { ProfileDetailsChildComponent } from './profile-details-child/profile-details-child.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnChanges {
  userContent: User;

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private UserContentDbService: UserContentDbService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.userContent = this.UserContentDbService.getCurrentUser();
  }

  ngOnChanges() {
  }
}
