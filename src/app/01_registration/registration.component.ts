import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Birthday } from '../_models/birthday.model';


import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  loading = false;
  registrationForm: FormGroup;

  public gender: Array<{content: string, label: string, labelChild: string}> = [
    {content: 'W', label: 'Frau', labelChild: 'Mädchen'},
    {content: 'M', label: 'Herr', labelChild: 'Junge'}];

  public languages: Array<{content: string, label: string}> = [
    {content: 'D', label: 'Deutsch'},
    {content: 'F', label: 'Französisch'},
    {content: 'E', label: 'Englisch'}];

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      formPFirstname: ['', [Validators.required, Validators.minLength(2)]],
      formPLastname: ['', [Validators.required, Validators.minLength(2)]],
      formAdress: ['', [Validators.required, Validators.minLength(4)]],
      formPlace: ['', [Validators.required, Validators.minLength(2)]],
      formZip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern(/[^a-zA-Z]/g)]],
      formTelprivate: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/[^a-zA-Z]/g)]],
      formTeloffice: ['', [Validators.minLength(10), Validators.pattern(/[^a-zA-Z]/g)]],
      formParentGender: ['', [Validators.required]],
      formLanguage: ['', [Validators.required]],
      formCFirstname: ['', [Validators.required, Validators.minLength(2)]],
      formCLastname: ['', [Validators.required, Validators.minLength(2)]],
      formChildGender: ['', [Validators.required]],
      formCBirthdayDay: ['', [Validators.required]]
    });
      console.log(this.formLanguage.status);
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
  get formCBirthdayDay() {
    return this.registrationForm.get('formCBirthdayDay');
  }


  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
