import {Component, HostBinding, OnInit, Output} from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User} from '../../_models/user.model';
import {UserContentService} from '../../_services/user-content.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-profile-email-change',
  templateUrl: './profile-email-change.component.html',
  animations: [overlayAnimation]
})

export class ProfileEmailChangeComponent implements OnInit {
  @HostBinding('@overlayAnimation') overlayAnimation;

  public userContent: User;
  public emailForm: FormGroup;

  private userContentSub: Subscription = null;

  constructor(
    private fb: FormBuilder,
    private UserContentService: UserContentService) { }

  public ngOnInit() {
    this.buildForm();

    if (this.userContentSub) {
      this.userContentSub.unsubscribe();
    }
    // get new data when child-components update data
    this.userContentSub = this.UserContentService.getCurrentUserObserver().subscribe((data) => {
      this.userContent = data;
    });
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
