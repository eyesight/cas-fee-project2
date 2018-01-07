import { trigger, state, animate, transition, style } from '@angular/animations';

export const overlayAnimation =
  trigger('overlayAnimation', [

    state('*', style({
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      'z-index': 1050,
      overflow: 'auto',
      'overflow-y': 'scroll'
    })),

    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({
        top: '-400%',
        opacity: '0'
      }),

      // animation and styles at end of transition
      animate('.2s ease-in', style({
        opacity: '1'
      })),
      animate('.2s ease-in', style({
        top: '0'
      }))
    ]),

    // route 'leave' transition
    transition(':leave', [
      // animation and styles at end of transition
      animate('.2s ease-in-out', style({
        top: '-400%'
      })),
      animate('.2s ease-in-out', style({
        opacity: '0'
      }))
    ])
  ]);
