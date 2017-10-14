import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  public ngOnInit() {
    console.log('home loaded initialized');
  }
}
