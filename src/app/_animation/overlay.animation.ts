import { trigger, state, animate, transition, style } from '@angular/animations';

export const overlayAnimation =
  trigger('overlayAnimation', [

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
  ]);
