import {Component, HostBinding, OnInit} from '@angular/core';
import {overlayAnimation} from '../_animation/overlay.animation';
import {Location} from '@angular/common';

@Component({
  selector: 'app-impressum',
  templateUrl: './impressum.component.html',
  animations: [overlayAnimation]
})
export class ImpressumComponent implements OnInit {
  @HostBinding('@overlayAnimation') overlayAnimation;

  constructor(private location: Location) { }
  public goback() {
    this.location.back(); // go back to previous location
  }

  ngOnInit() {
  }

}
