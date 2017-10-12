import { Component, OnInit } from '@angular/core';
import { User } from 'app/model/user.model';

@Component({
  selector: 'app-classlist-item',
  templateUrl: './classlist-item.component.html'
})
export class ClasslistItemComponent implements OnInit {

  user: User;
  constructor() { }

  ngOnInit() {
  }

}
