import {Component, HostBinding, OnInit} from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  animations: [overlayAnimation]
})
export class ForgotPasswordComponent implements OnInit {
  @HostBinding('@overlayAnimation') overlayAnimation;

  constructor() { }

  public ngOnInit() {
  }

}
