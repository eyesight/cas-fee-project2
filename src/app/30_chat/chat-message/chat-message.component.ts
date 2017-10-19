import { Component, OnInit, Input } from '@angular/core';

import { MessageItem, Message } from '../../model/messageItem.model';
import { Klasse } from '../../model/klasse.model';
import { User } from '../../model/user.model';


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
