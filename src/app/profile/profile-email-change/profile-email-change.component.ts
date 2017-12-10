import { Component, OnInit } from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../_validation/custom.validators';

@Component({
  selector: 'app-profile-email-change',
  templateUrl: './profile-email-change.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
})
export class ProfileEmailChangeComponent implements OnInit {
  public emailForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]],
      reason: ['', [Validators.required]]
    });
  }

  get newEmail() {
    return this.emailForm.get('newEmail');
  }
  get reason() {
    return this.emailForm.get('reason');
  }

}
