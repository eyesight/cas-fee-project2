import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { overlayAnimation } from '../../_animation/overlay.animation';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  animations: [overlayAnimation],
  host: { '[@overlayAnimation]': ''}
  })
export class TermsOfUseComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }
  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
