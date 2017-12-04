import { Component, OnInit } from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';

@Component({
  selector: 'app-profile-details-parent',
  templateUrl: './profile-details-parent.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
})
export class ProfileDetailsParentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
