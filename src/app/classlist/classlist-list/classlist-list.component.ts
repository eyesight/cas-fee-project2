import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-classlist-list',
  templateUrl: './classlist-list.component.html'
})
export class ClasslistListComponent implements OnInit {

  user: User[] = [];
  constructor() { }

  ngOnInit() {
  }

}
