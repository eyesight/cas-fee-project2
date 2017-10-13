import { Component } from '@angular/core';
import { Route } from '@angular/router';

import { ROUTES } from './app.routes';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'app';

 // public navItems: Route[];

  constructor(){
   // this.navItems = ROUTES.filter((route) => route.data);

  }
}
