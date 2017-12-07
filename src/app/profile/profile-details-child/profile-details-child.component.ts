import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user.model';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { UserContentService } from '../../_services/user-content.service';
import { UserContentDbService } from '../../_services/user-content-db.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../_services/user-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_validation/custom.validators';
import { AlertService, UserService } from '../../_services/index';


@Component({
  selector: 'app-profile-details-child',
  templateUrl: './profile-details-child.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
})

export class ProfileDetailsChildComponent implements OnInit {
  public user: User;
  public userContent: User = null;
  public currentUser: User = null;
  public childDetailsForm: FormGroup;
  public formModel: User;
  public userObject: User;

  constructor(
    private UserContentDbService: UserContentDbService,
    private router: Router,
    private userAuthService: UserAuthService,
    private UserContentService: UserContentService,
    private alertService: AlertService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userContent = this.UserContentDbService.getCurrentUser();
    this.currentUser = this.userContent['user_attributes'];
    console.log(this.userContent);

    this.buildForm();
  }

  get formChildGender() {
    return this.childDetailsForm.get('child_gender');
  }

  get formCFirstname() {
    return this.childDetailsForm.get('child_forename');
  }

  get formCLastname() {
    return this.childDetailsForm.get('child_surname');
  }

  get formCBirthday() {
    return this.childDetailsForm.get('child_date_of_birth');
  }

  update() {
    this.formModel = this.childDetailsForm.value;
    this.currentUser.child_forename = this.formModel.child_forename;
    this.currentUser.child_surname = this.formModel.child_surname;
    this.userObject = this.UserContentService.generateUpdatedUser(this.currentUser);
    console.log(this.userObject);

    this.userService.update(this.userObject)
      .subscribe(
        data => {
          console.log('update Child success');
          this.router.navigate(['/profile']);
        },
        error => {
          console.log  ('update Child error');
          this.alertService.error(error);
        });
  }

  buildForm() {
    this.childDetailsForm = this.fb.group({
      child_gender: [this.currentUser.child_gender, [Validators.required]],
      child_forename: [this.currentUser.child_forename, [Validators.required, Validators.minLength(2)]],
      child_surname: [this.currentUser.child_surname, [Validators.required, Validators.minLength(2)]],
      child_date_of_birth: [this.currentUser.child_date_of_birth, [Validators.required, CustomValidators.dateFormat]]
    });
  }



}
