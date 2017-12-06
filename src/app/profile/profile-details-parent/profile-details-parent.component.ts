import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user.model';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { UserContentDbService } from '../../_services/user-content-db.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../../_services/user-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_validation/custom.validators';
import { AlertService, UserService } from '../../_services/index';

@Component({
  selector: 'app-profile-details-parent',
  templateUrl: './profile-details-parent.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
})
export class ProfileDetailsParentComponent implements OnInit {
  public user: User;
  public userContent: User = null;
  public currentUser: User = null;
  public parentDetailsForm: FormGroup;
  public formModel: User;

  public languages: Array<{ content: string, label: string }> = [
    {content: 'de', label: 'Deutsch'},
    {content: 'fr', label: 'Französisch'},
    {content: 'en', label: 'Englisch'}];

  update() {
    this.formModel = this.parentDetailsForm.value;
    this.currentUser.child_forename = this.formModel.child_forename;
    this.currentUser.child_surname = this.formModel.child_surname;
    console.log(this.formModel);

    /*this.userService.update(this.currentUser)
     .subscribe(
     data => {
     console.log('update Child success');
     this.router.navigate(['/profile']);
     },
     error => {
     console.log  ('update Child error');
     this.alertService.error(error);
     });*/
  }

  buildForm() {
    this.parentDetailsForm = this.fb.group({
      parent_gender: [this.currentUser.parent_gender, [Validators.required]],
      parent_forename: [this.currentUser.parent_forename, [Validators.required, Validators.minLength(2)]],
      parent_surname: [this.currentUser.parent_surname, [Validators.required, Validators.minLength(2)]],
      parent_language: [this.currentUser.parent_language, [Validators.required]],
      adress: [this.currentUser.adress, [Validators.required, Validators.minLength(4)]],
      place: [this.currentUser.place, [Validators.required, Validators.minLength(2)]],
      zip: [this.currentUser.zip, [Validators.required, Validators.minLength(4), Validators.maxLength(4), CustomValidators.justNumbers]],
      tel_private: [this.currentUser.tel_private, [Validators.required, Validators.minLength(10), CustomValidators.telephoneNumber]],
      tel_office: [this.currentUser.tel_office],
    });
  }

  constructor(
    private UserContentDbService: UserContentDbService,
    private router: Router,
    private userAuthService: UserAuthService,
    private alertService: AlertService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit():void {
    this.userContent = this.UserContentDbService.getCurrentUser();
    this.currentUser = this.userContent['user_attributes'];
    console.log(this.currentUser);

    this.buildForm();
  }

  get formParentGender() {
    return this.parentDetailsForm.get('parent_gender');
  }

  get formPFirstname() {
    return this.parentDetailsForm.get('parent_forename');
  }

  get formPLastname() {
    return this.parentDetailsForm.get('parent_surname');
  }

  get formLanguage() {
    return this.parentDetailsForm.get('parent_language');
  }

  get formAdress() {
    return this.parentDetailsForm.get('adress');
  }

  get formPlace() {
    return this.parentDetailsForm.get('place');
  }

  get formZip() {
    return this.parentDetailsForm.get('zip');
  }

  get formTelprivate() {
    return this.parentDetailsForm.get('tel_private');
  }

  get formTeloffice() {
    return this.parentDetailsForm.get('tel_office');
  }
}
