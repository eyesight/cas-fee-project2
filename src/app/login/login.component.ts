import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AlertService, AuthenticationService } from '../_services/index';
import {User} from "../_models/user.model";
import {UserContentService} from "../_services/user-content.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  loginForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userContentService: UserContentService,
    private alertService: AlertService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
       formUsername: ['', [Validators.required, Validators.minLength(2)]],
       formPassword: ['', [Validators.required, Validators.minLength(2)]]
      });
    // reset login status
    this.authenticationService.logout();
    this.userContentService.clear();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get formUsername() {
    return this.loginForm.get('formUsername');
  }
  get formPassword() {
    return this.loginForm.get('formPassword');
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe( data => {

          this.userContentService.getUserContent()
            .subscribe( content => {
              console.log('content:' + content);

              // found an angular error: if meanwhile the permission is changed to not allowed for the returnUrl the site doesnt move to home
              if (data.user_can.length > 0) {
                this.router.navigate([this.returnUrl]);
              }else {
                this.router.navigate(['/home']);
              }
            },
            error => {
              console.log('login error: ' + error);
              this.alertService.error(error);
              this.loading = false;
            });
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
