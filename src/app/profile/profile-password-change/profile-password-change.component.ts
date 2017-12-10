import { Component, OnInit } from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../_models/user.model';
import { UserContentService } from '../../_services/user-content.service';
import { UserContentDbService } from '../../_services/user-content-db.service';
import { CustomValidators } from '../../_validation/custom.validators';



@Component({
  selector: 'app-profile-password-change',
  templateUrl: './profile-password-change.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
})
export class ProfilePasswordChangeComponent implements OnInit {
  public userContent: User;
  public pwdForm: FormGroup;
  public formModel: User;
  public userObject = new User;

  constructor(private fb: FormBuilder,
              private UserContentDbService: UserContentDbService,
              private userContentService: UserContentService,) {
  }

  ngOnInit() {
    this.userContent = this.UserContentDbService.getCurrentUser();
    this.buildForm();
  }

  buildForm() {
    this.pwdForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      formPasswordConfirm: this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15), CustomValidators.passwordCheck]],
        confirmNewPassword: ['', [Validators.required]]
      }, {validator: Validators.compose([CustomValidators.matcher('formPassword', 'confirmPassword')])})
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
