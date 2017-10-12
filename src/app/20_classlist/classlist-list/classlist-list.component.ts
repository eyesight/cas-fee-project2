import { Component, OnInit } from '@angular/core';
import { Message } from 'app/model/message.model';

@Component({
  selector: 'app-classlist-list',
  templateUrl: './classlist-list.component.html'
})
export class ClasslistListComponent implements OnInit {

  messages: Message[] = [];
  constructor() { }

  ngOnInit() {
  }

}
