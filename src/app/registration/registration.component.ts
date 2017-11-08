import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControlDirective
} from '@angular/forms';
import {CustomValidators} from '../_validation/custom.validators';


import {AlertService, UserService} from '../_services/index';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  loading = false;
  registrationForm: FormGroup;

  public gender: Array<{ content: string, label: string, labelChild: string }> = [
    {content: 'w', label: 'Frau', labelChild: 'Mädchen'},
    {content: 'm', label: 'Herr', labelChild: 'Junge'}];

  public languages: Array<{ content: string, label: string }> = [
    {content: 'de', label: 'Deutsch'},
    {content: 'fr', label: 'Französisch'},
    {content: 'en', label: 'Englisch'}];

  constructor(private router: Router,
              private userService: UserService,
              private alertService: AlertService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      formPFirstname: ['', [Validators.required, Validators.minLength(2)]],
      formPLastname: ['', [Validators.required, Validators.minLength(2)]],
      formAdress: ['', [Validators.required, Validators.minLength(4)]],
      formPlace: ['', [Validators.required, Validators.minLength(2)]],
      formZip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), CustomValidators.justNumbers]],
      formTelprivate: ['', [Validators.required, Validators.minLength(10), CustomValidators.telephoneNumber]],
      formTeloffice: ['', [Validators.minLength(10), CustomValidators.telephoneNumber]],
      formParentGender: ['', [Validators.required]],
      formLanguage: ['', [Validators.required]],
      formCFirstname: ['', [Validators.required, Validators.minLength(2)]],
      formCLastname: ['', [Validators.required, Validators.minLength(2)]],
      formChildGender: ['', [Validators.required]],
      formCBirthday: ['', [Validators.required, CustomValidators.dateFormat]],
      formEMailConfirm: this.fb.group({
        formEmail: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]]
      }, {validator: CustomValidators.matcher('formEmail', 'confirmEmail')}),
      formPasswordConfirm: this.fb.group({
        formPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), CustomValidators.passwordCheck]],
        confirmPassword: ['', [Validators.required]]
      }, {validator: Validators.compose([CustomValidators.matcher('formPassword', 'confirmPassword')])})
    });
  }

  get formPFirstname() {
    return this.registrationForm.get('formPFirstname');
  }

  get formPLastname() {
    return this.registrationForm.get('formPLastname');
  }

  get formAdress() {
    return this.registrationForm.get('formAdress');
  }

  get formPlace() {
    return this.registrationForm.get('formPlace');
  }

  get formZip() {
    return this.registrationForm.get('formZip');
  }

  get formTelprivate() {
    return this.registrationForm.get('formTelprivate');
  }

  get formTeloffice() {
    return this.registrationForm.get('formTeloffice');
  }

  get formParentGender() {
    return this.registrationForm.get('formParentGender');
  }

  get formLanguage() {
    return this.registrationForm.get('formLanguage');
  }

  get formCFirstname() {
    return this.registrationForm.get('formCFirstname');
  }

  get formCLastname() {
    return this.registrationForm.get('formCLastname');
  }

  get formChildGender() {
    return this.registrationForm.get('formChildGender');
  }

  get formCBirthday() {
    return this.registrationForm.get('formCBirthday');
  }

  get formEMailConfirm() {
    return this.registrationForm.get('formEMailConfirm');
  }

  get formEmail() {
    return this.formEMailConfirm.get('formEmail');
  }

  get formPasswordConfirm() {
    return this.registrationForm.get('formPasswordConfirm');
  }

  get formPassword() {
    return this.formPasswordConfirm.get('formPassword');
  }


  register() {
    this.loading = true;
    console.log('registration-object: '+ this.model.email);
    this.userService.create(this.model)
      .subscribe(
        data => {
          console.log('register success' + data);
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          console.log('register error '+ error);
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
