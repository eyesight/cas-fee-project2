import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


import { AlertService, UserService } from '../_services/index';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  loading = false;
  registrationForm: FormGroup;

  constructor(
    private router: Router,
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
      formZip: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern(/[^a-zA-Z]/g)]]
    });
    console.log(this.formZip.errors.pattern);
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
