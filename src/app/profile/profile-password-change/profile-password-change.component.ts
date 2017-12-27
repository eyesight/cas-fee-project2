import {Component, OnInit} from '@angular/core';
import {overlayAnimation} from '../../_animation/overlay.animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User, UserPwdChange} from '../../_models/user.model';
import {UserContentService} from '../../_services/user-content.service';
import {CustomValidators} from '../../_validation/custom.validators';
import {Router} from '@angular/router';
import {AlertService, UserService} from '../../_services/index';


@Component({
  selector: 'app-profile-password-change',
  templateUrl: './profile-password-change.component.html',
  animations: [overlayAnimation],
  host: {'[@overlayAnimation]': ''}
})
export class ProfilePasswordChangeComponent implements OnInit {
  public userContent: User;
  public pwdForm: FormGroup;
  public userObject = new UserPwdChange;

  constructor(private fb: FormBuilder,
              private UserContentService: UserContentService,
              private userService: UserService,
              private router: Router,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.userContent = this.UserContentService.getCurrentUser();
    this.buildForm();
  }

  buildForm() {
    this.pwdForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      formPasswordConfirm: this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
        confirmNewPassword: ['', [Validators.required, CustomValidators.passwordCheck]]
      }, {validator: Validators.compose([CustomValidators.matcher('newPassword', 'confirmNewPassword')])})
    });
  }

  updatePwd() {
    this.userObject.new_pwd = this.newPassword.value;
    this.userObject.pwd = this.oldPassword.value;
    this.userService.updatePassword(this.userObject)
      .subscribe(
        data => {
          this.alertService.success('Daten wurden erfolgreich geändert', true);
          this.router.navigate(['/profile']);
        },
        error => {
          this.alertService.error('Das alte Passwort stimmt leider nicht oder das neue Passwort entspricht nicht den Richtlinien');
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
