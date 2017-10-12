import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';


@Component({
  selector: 'app-chat-addmessage',
  templateUrl: './chat-addmessage.component.html'
})
export class ChatAddmessageComponent implements OnInit {
  message: Message;
  constructor() { }

  ngOnInit() {
  }

}
