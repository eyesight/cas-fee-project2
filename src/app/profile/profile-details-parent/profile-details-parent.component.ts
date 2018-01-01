import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user.model';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_validation/custom.validators';
import { AlertService, UserService, AlertMessagesService } from '../../_services/index';
import { UserContentService } from '../../_services/user-content.service';

@Component({
  selector: 'app-profile-details-parent',
  templateUrl: './profile-details-parent.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
})
export class ProfileDetailsParentComponent implements OnInit {
  public user: User = null;
  public userContent: User = null;
  public parentDetailsForm: FormGroup;
  public formModel: User;
  public userObject = new User;

  public languages: Array<{ content: string, label: string }> = [
    {content: 'de', label: 'Deutsch'},
    {content: 'fr', label: 'Französisch'},
    {content: 'en', label: 'Englisch'}];

  constructor(
    private UserContentService: UserContentService,
    private router: Router,
    private alertService: AlertService,
    private alertMessagesService: AlertMessagesService,
    private userService: UserService,
    private userContentService: UserContentService,
    private fb: FormBuilder
  ) { }

  ngOnInit():void {
    this.userContent = this.UserContentService.getCurrentUser();
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

  update() {
    // add Value of Form into formModel to pass it to new userObject
    this.formModel = this.parentDetailsForm.value;

    this.userObject.adress = this.formModel.adress;
    this.userObject.child_date_of_birth = this.userContent.child_date_of_birth;
    this.userObject.child_forename = this.userContent.child_forename;
    this.userObject.child_gender = this.userContent.child_gender;
    this.userObject.child_surname = this.userContent.child_surname;
    this.userObject.class_id = this.userContent.class_id;
    this.userObject.parent_forename = this.formModel.parent_forename;
    this.userObject.parent_surname = this.formModel.parent_surname;
    this.userObject.parent_gender = this.formModel.parent_gender;
    this.userObject.parent_language = this.formModel.parent_language;
    this.userObject.place = this.formModel.place;
    this.userObject.tel_office = this.formModel.tel_office;
    this.userObject.tel_private = this.formModel.tel_private;
    this.userObject.zip = this.formModel.zip;

    // update child - add message if succeeded or failed and go back to the profile-site
    this.userService.update(this.userObject)
      .subscribe(
        data => {
          this.alertService.success(this.alertMessagesService.MessagesSuccess.dataChange, true);
          // update the content in user-store
          this.userContentService.getUserContent()
            .subscribe( content => {
                // update data in parent-commponent (profile.component) via service
                this.router.navigate(['/profile']);
              },
              error => {
                this.alertService.error(this.alertMessagesService.MessagesError.tryAgain, true);
                this.router.navigate(['/profile']);
              });
        },
        error => {
          this.alertService.error(this.alertMessagesService.MessagesError.tryAgain);
        });
  }

  buildForm() {
    this.parentDetailsForm = this.fb.group({
      parent_gender: [this.userContent.parent_gender, [Validators.required]],
      parent_forename: [this.userContent.parent_forename, [Validators.required, Validators.minLength(2)]],
      parent_surname: [this.userContent.parent_surname, [Validators.required, Validators.minLength(2)]],
      parent_language: [this.userContent.parent_language, [Validators.required]],
      adress: [this.userContent.adress, [Validators.required, Validators.minLength(4)]],
      place: [this.userContent.place, [Validators.required, Validators.minLength(2)]],
      zip: [this.userContent.zip, [Validators.required, Validators.minLength(4), Validators.maxLength(4), CustomValidators.justNumbers]],
      tel_private: [this.userContent.tel_private, [Validators.required, Validators.minLength(10), CustomValidators.telephoneNumber]],
      tel_office: [this.userContent.tel_office],
    });
  }
}
