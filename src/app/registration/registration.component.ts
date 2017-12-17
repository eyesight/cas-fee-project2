import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../_validation/custom.validators';
import { DatepickerOptions } from 'ng2-datepicker';
import { User } from '../_models/user.model';
import * as deLocale from 'date-fns/locale/de';
import * as moment from 'moment';
import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {
  public loading = false;
  public registrationForm: FormGroup;
  public formModel: User;
  public data: any;
  public date: Date;
  public today: string;
  public submitted: boolean = false;

  options: DatepickerOptions = {
    minYear: 1980,
    maxYear: 2020,
    displayFormat: 'D[.] MMMM YYYY',
    barTitleFormat: 'MMMM YYYY',
    firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
    locale: deLocale
  };

  public languages: Array<{ content: string, label: string }> = [
    {content: 'de', label: 'Deutsch'},
    {content: 'fr', label: 'Französisch'},
    {content: 'en', label: 'Englisch'}];

  public klasses: Array<{ id: number, description: string }>;

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService,
              private fb: FormBuilder) {
    this.date = new Date();
  }

  ngOnInit(): void {
    this.buildForm();
    this.getklasse();
    this.submitted = false;
  }

  register() {
    this.submitted = true;

    if (this.registrationForm.valid){
      // add Value of Form into formModel to pass it to new userObject
      this.formModel = this.registrationForm.value;

      // format the date of the child_date_of_birth with moment
      this.data = moment(this.formModel.child_date_of_birth).locale('de-ch').format("YYYY-MM-DD");

      this.formModel.child_date_of_birth = this.data;
      this.formModel.email = this.formEmail.value;
      this.formModel.pwd = this.formPassword.value;
      this.formModel.register_date = this.date;

      this.loading = true;

      this.userService.create(this.formModel)
        .subscribe(
          data => {
            this.alertService.success('Registrierung war erfolgreich', true, 500);
            this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error(error, true, 500);
            this.loading = false;
          });
    }
  }

  getklasse() {
    return this.userService.showKlasses()
      .subscribe((result) => {
       this.klasses = result;
      });
  }

  buildForm() {
    this.registrationForm = this.fb.group({
      parent_forename: ['', [Validators.required, Validators.minLength(2)]],
      parent_surname: ['', [Validators.required, Validators.minLength(2)]],
      adress: ['', [Validators.required, Validators.minLength(4)]],
      place: ['', [Validators.required, Validators.minLength(2)]],
      zip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), CustomValidators.justNumbers]],
      tel_private: ['', [Validators.required, Validators.minLength(10), CustomValidators.telephoneNumber]],
      tel_office: [''],
      parent_gender: ['', [Validators.required]],
      parent_language: ['', [Validators.required]],
      child_forename: ['', [Validators.required, Validators.minLength(2)]],
      child_surname: ['', [Validators.required, Validators.minLength(2)]],
      child_gender: ['', [Validators.required]],
      child_date_of_birth: [this.date, [Validators.required]],
      class_id: ['', [Validators.required]],
      formEMailConfirm: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, {validator: CustomValidators.matcher('email', 'confirmEmail')}),
      formPasswordConfirm: this.fb.group({
        pwd: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15), CustomValidators.passwordCheck]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: Validators.compose([CustomValidators.matcher('pwd', 'confirmPassword')])})
    });
  }

  get formPFirstname() {
    return this.registrationForm.get('parent_forename');
  }

  get formPLastname() {
    return this.registrationForm.get('parent_surname');
  }

  get formAdress() {
    return this.registrationForm.get('adress');
  }

  get formPlace() {
    return this.registrationForm.get('place');
  }

  get formZip() {
    return this.registrationForm.get('zip');
  }

  get formTelprivate() {
    return this.registrationForm.get('tel_private');
  }

  get formTeloffice() {
    return this.registrationForm.get('tel_office');
  }

  get formParentGender() {
    return this.registrationForm.get('parent_gender');
  }

  get formLanguage() {
    return this.registrationForm.get('parent_language');
  }

  get formCFirstname() {
    return this.registrationForm.get('child_forename');
  }

  get formCLastname() {
    return this.registrationForm.get('child_surname');
  }

  get formChildGender() {
    return this.registrationForm.get('child_gender');
  }

  get formCBirthday() {
    return this.registrationForm.get('child_date_of_birth');
  }

  get formChildKlasse(){
    return this.registrationForm.get('class_id');
  }

  get formEMailConfirm() {
    return this.registrationForm.get('formEMailConfirm');
  }

  get formEmail() {
    return this.formEMailConfirm.get('email');
  }

  get formPasswordConfirm() {
    return this.registrationForm.get('formPasswordConfirm');
  }

  get formPassword() {
    return this.formPasswordConfirm.get('pwd');
  }
}
