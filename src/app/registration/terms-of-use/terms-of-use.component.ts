import { Component, OnInit } from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
  })
export class TermsOfUseComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
