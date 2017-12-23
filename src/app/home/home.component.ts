import {Component, OnInit} from '@angular/core';
import {UserAuthService} from '../_services/user-auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public UserActivation: String[];
  public isActivated: boolean;

  constructor(private userAuthService: UserAuthService) {

  }

  public ngOnInit() {
    // get new data when child-components update data
    this.UserActivation = this.userAuthService.getCurrentCan();
    this.isActivated = (this.UserActivation.length === 0) ? false : true;
  }

}
