import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { Klasse } from '../../model/klasse.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit {

  message: Message;
  klasse: Klasse;
  user: User;

  constructor() { }

  ngOnInit() {
  }

}
