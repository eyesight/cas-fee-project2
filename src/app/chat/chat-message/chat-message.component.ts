import { Component, OnInit, Input } from '@angular/core';

import { MessageItem, Message } from '../../_models/message.model';
import { Klasse } from '../../_models/klasse.model';
import { User } from '../../_models/user.model';


@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit {

  @Input()
  public message: Message;

  ngOnInit() {
  }

}
