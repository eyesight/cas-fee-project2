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


 /* message: Message = new Message;
  klasse: Klasse = new Klasse;
  user: User = new User;
*/


  constructor() {

  /*  this.user.childname = 'Ursli';
    this.klasse.title = 'Ase3';
    this.message.text = 'Lorem ';
*/
  }

  ngOnInit() {
  }

}
