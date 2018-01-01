import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../_models/user.model';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { UserContentService } from '../../_services/user-content.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, UserService, AlertMessagesService } from '../../_services/index';
import { DatepickerOptions } from 'ng2-datepicker';
import * as deLocale from 'date-fns/locale/de';
import * as moment from 'moment';

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
    public data: any;

    options: DatepickerOptions = {
      minYear: 1980,
      maxYear: 2020,
      displayFormat: 'D[.] MMMM YYYY',
      barTitleFormat: 'MMMM YYYY',
      firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
      locale: deLocale
    };

  constructor(
    private userContentService: UserContentService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private alertMessagesService: AlertMessagesService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userContent = this.userContentService.getCurrentUser();

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

    // format the date with moment
    this.data = moment(this.formModel.child_date_of_birth).locale('de-ch').format('YYYY-MM-DD');

    this.userObject.adress = this.userContent.adress;
    this.userObject.child_date_of_birth = this.data;
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
    this.childDetailsForm = this.fb.group({
      child_gender: [this.userContent.child_gender, [Validators.required]],
      child_forename: [this.userContent.child_forename, [Validators.required, Validators.minLength(2)]],
      child_surname: [this.userContent.child_surname, [Validators.required, Validators.minLength(2)]],
      child_date_of_birth: [this.userContent.child_date_of_birth, [Validators.required]],
    });
  }
}
