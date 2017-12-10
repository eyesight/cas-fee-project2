import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user.model';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { UserContentService } from '../../_services/user-content.service';
import { UserContentDbService } from '../../_services/user-content-db.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_validation/custom.validators';
import { AlertService, UserService } from '../../_services/index';
import { ProfileService } from '../service/profile.service';


@Component({
  selector: 'app-profile-details-child',
  templateUrl: './profile-details-child.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
})

export class ProfileDetailsChildComponent implements OnInit {
    public userContent: User;
    public childDetailsForm: FormGroup;
    public formModel: User;
    public userObject = new User;

  constructor(
    private UserContentDbService: UserContentDbService,
    private userContentService: UserContentService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    console.log(this.userContent);
    this.userContent = this.UserContentDbService.getCurrentUser();
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
    // add Value of Form into formModel to pass it to new userObject
    this.formModel = this.childDetailsForm.value;

    this.userObject.adress = this.userContent.adress;
    this.userObject.child_date_of_birth = this.formModel.child_date_of_birth;
    this.userObject.child_forename = this.formModel.child_forename;
    this.userObject.child_gender = this.formModel.child_gender;
    this.userObject.child_surname = this.formModel.child_surname;
    this.userObject.class_id = this.userContent.class_id;
    this.userObject.parent_forename = this.userContent.parent_forename;
    this.userObject.parent_surname = this.userContent.parent_surname;
    this.userObject.parent_gender = this.userContent.parent_gender;
    this.userObject.parent_language = this.userContent.parent_language;
    this.userObject.place = this.userContent.place;
    this.userObject.tel_office = this.userContent.tel_office;
    this.userObject.tel_private = this.userContent.tel_private;
    this.userObject.zip = this.userContent.zip;

    // update child - add message if succeeded or failed and go back to the profile-site
    this.userService.update(this.userObject)
      .subscribe(
        data => {
          this.alertService.success('Daten wurden erfolgreich geändert', true);
          // update the content in user-store
          this.userContentService.getUserContent()
            .subscribe( content => {
                // update data in parent-commponent (profile.component) via service
                this.profileService.updateData(content);
                this.router.navigate(['/profile']);
              },
              error => {
                this.alertService.error(error);
              });
        },
        error => {
          this.alertService.error(error);
        });
  }

  buildForm() {
    this.childDetailsForm = this.fb.group({
      child_gender: [this.userContent.child_gender, [Validators.required]],
      child_forename: [this.userContent.child_forename, [Validators.required, Validators.minLength(2)]],
      child_surname: [this.userContent.child_surname, [Validators.required, Validators.minLength(2)]],
      child_date_of_birth: [this.userContent.child_date_of_birth, [Validators.required, CustomValidators.dateFormat]]
    });
  }
}
