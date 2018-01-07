import {Component, HostBinding, OnInit} from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  animations: [overlayAnimation]
  })
export class TermsOfUseComponent implements OnInit {
  @HostBinding('@overlayAnimation') overlayAnimation;


  constructor() { }

  ngOnInit() {
  }
}
