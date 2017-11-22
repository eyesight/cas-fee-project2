import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  animations: [
    trigger('overlay', [

      state('*', style({
        position: 'absolute'
      })),

      // route 'enter' transition
      transition(':enter', [

        // styles at start of transition
        style({
          top: '-400%',
        }),

        // animation and styles at end of transition
        animate('.5s ease-in-out', style({
          top: 0,
        }))
      ]),

      // route 'leave' transition
      transition(':leave', [
        // animation and styles at end of transition
        animate('.5s ease-in-out', style({
          top: '-400%',
        }))
      ])
    ])
  ]
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
