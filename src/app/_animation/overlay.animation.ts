import { trigger, state, animate, transition, style } from '@angular/animations';

export const overlayAnimation =
  trigger('overlayAnimation', [

    state('*', style({
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      'z-index': 999,
      overflow: 'auto',
      'overflow-y':'scroll'
    })),

    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({
        top: '-400%',
      }),

      // animation and styles at end of transition
      animate('.2s ease-in-out', style({
        top: '0',
      }))
    ]),

    // route 'leave' transition
    transition(':leave', [
      // animation and styles at end of transition
      animate('.2s ease-in-out', style({
        top: '-400%',
      }))
    ])
  ]);
