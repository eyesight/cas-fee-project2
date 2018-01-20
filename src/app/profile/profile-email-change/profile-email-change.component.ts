import {Component, HostBinding, OnInit} from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-email-change',
  templateUrl: './profile-email-change.component.html',
  animations: [overlayAnimation]
})

export class ProfileEmailChangeComponent implements OnInit {
  @HostBinding('@overlayAnimation') overlayAnimation;

  public emailForm: FormGroup;

  constructor(
    private fb: FormBuilder) { }

  public ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
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
