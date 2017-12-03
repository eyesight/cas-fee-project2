import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { UserContentDbService } from '../_services/user-content-db.service';
import { UserAuthService } from '../_services/user-auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  public userContent: User = null;
  public currentUser: User = null;

  constructor(
    private router: Router,
    private userAuthService: UserAuthService,
    private UserContentDbService: UserContentDbService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.userContent = this.UserContentDbService.getCurrentUser();
    this.currentUser = this.userContent['user_attributes'];

    console.log(this.currentUser);
  }

}
