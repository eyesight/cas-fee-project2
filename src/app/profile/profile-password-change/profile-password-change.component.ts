import {Component, HostBinding, OnInit} from '@angular/core';
import {overlayAnimation} from '../../_animation/overlay.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User, UserPwdChange} from '../../_models/user.model';
import {UserContentService} from '../../_services/user-content.service';
import {CustomValidators} from '../../_validation/custom.validators';
import {Router} from '@angular/router';
import {AlertService, UserService, AlertMessagesService} from '../../_services/index';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-profile-password-change',
  templateUrl: './profile-password-change.component.html',
  animations: [overlayAnimation]
})
export class ProfilePasswordChangeComponent implements OnInit {
  @HostBinding('@overlayAnimation') overlayAnimation;

  public userContent: User;
  public pwdForm: FormGroup;
  public userObject = new UserPwdChange;
  private updatePwdSub: Subscription = null;

  constructor(private fb: FormBuilder,
              private UserContentService: UserContentService,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService,
              private alertMessagesService: AlertMessagesService) {
  }

  public ngOnInit() {
    this.userContent = this.UserContentService.getCurrentUser();
    this.buildForm();
  }

  private buildForm() {
    this.pwdForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      formPasswordConfirm: this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15), CustomValidators.passwordCheck]],
        confirmNewPassword: ['', [Validators.required, CustomValidators.passwordCheck]]
      }, {validator: Validators.compose([CustomValidators.matcher('newPassword', 'confirmNewPassword')])})
    });
  }

  public updatePwd() {
    this.userObject.new_pwd = this.newPassword.value;
    this.userObject.pwd = this.oldPassword.value;

    if (this.updatePwdSub) {
      this.updatePwdSub.unsubscribe();
    }
    this.updatePwdSub = this.userService.updatePassword(this.userObject)
      .subscribe(
        data => {
          this.alertService.success(this.alertMessagesService.MessagesSuccess.dataChange, true);
          this.router.navigate(['/profile']);
        },
        error => {
          this.alertService.error(this.alertMessagesService.MessagesError.password);
        });
  }

  get oldPassword() {
    return this.pwdForm.get('oldPassword');
  }

  get formPasswordConfirm() {
    return this.pwdForm.get('formPasswordConfirm');
  }

  get newPassword() {
    return this.formPasswordConfirm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.formPasswordConfirm.get('confirmNewPassword');
  }
}
