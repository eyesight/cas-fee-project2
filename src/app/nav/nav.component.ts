import { Component, OnInit } from '@angular/core';
import {Route, Router} from '@angular/router';

import { ROUTES } from '../app.routes';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html'
})
export class NavComponent implements OnInit {
  public navItems: Route[];

  constructor() {
    this.navItems = ROUTES.filter((route) => route.data);
    console.log('constructor nav.component:' + this.navItems);
  }
  ngOnInit() {
  }

}
