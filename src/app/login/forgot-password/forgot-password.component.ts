import { Component, OnInit } from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
})
export class ForgotPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
