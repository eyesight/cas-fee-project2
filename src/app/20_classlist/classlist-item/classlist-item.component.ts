import { Component, OnInit } from '@angular/core';
import { Message } from 'app/model/'
@Component({
  selector: 'app-classlist-item',
  templateUrl: './classlist-item.component.html'
})
export class ClasslistItemComponent implements OnInit {

  message: Message;
  constructor() { }

  ngOnInit() {
  }

}
