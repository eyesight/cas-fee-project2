import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService, AuthenticationService} from '../_services/index';
import {UserContentService} from '../_services/user-content.service';
import {ErrorHandlerService} from '../_services/index';
import {ClasslistAvatarService} from '../_services/user-classlist-avatars.service';
import {User} from '../_models/user.model';
import {AlertMessagesService} from '../_services/alert-messages.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, AfterViewInit {
  public model: any = {};
  public loading = false;
  public returnUrl: string;
  public loginForm: FormGroup;
  public formModel: User;
  private authSub: Subscription = null;
  private userContentSub: Subscription = null;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userContentService: UserContentService,
              private alertService: AlertService,
              private alertMessagesService: AlertMessagesService,
              private errorHandlerService: ErrorHandlerService,
              private classlistAvatarService: ClasslistAvatarService,
              private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.buildForm();
    console.log('login:ngOnInit');
    this.init();
  }

  public ngAfterViewInit() {
    console.log('login:ngAfterViewInit');
  }

  private init() {
    // reset login status
    this.authenticationService.logout();
    this.userContentService.clear();
    this.classlistAvatarService.clear();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  public login() {
    this.loading = true;
    this.formModel = this.loginForm.value;
    this.formModel.email = this.formModel.email.toLowerCase();

    if (this.authSub) {
      this.authSub.unsubscribe();
    }
    this.authSub = this.authenticationService.login(this.formModel.email, this.formModel.pwd)
      .subscribe(data => {

          if (this.userContentSub) {
            this.userContentSub.unsubscribe();
          }
          this.userContentSub = this.userContentService.getUserContent()
            .subscribe(content => {
                if (data.user_can.length > 0) {
                  this.router.navigate([this.returnUrl]);
                } else {
                  this.router.navigate(['/home']);
                }
              },
              error => {
                this.errorHandlerService.handleError(error);
                this.loading = false;
              });
        },
        error => {
          if (error.toString().match(/401/g)) {
            this.alertService.error(this.alertMessagesService.MessagesError.login401, true, 500);

          } else {
            this.alertService.error(this.alertMessagesService.MessagesError.error, true, 500);
          }
          this.loading = false;
        });
  }

  private buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(2)]],
      pwd: ['', [Validators.required, Validators.minLength(2)]]
    });
    console.log(this.loginForm.invalid);
  }

  get formUsername() {
    return this.loginForm.get('email');
  }

  get formPassword() {
    return this.loginForm.get('pwd');
  }
}
