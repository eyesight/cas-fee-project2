import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { Klasse } from '../../model/klasse.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit {

  message: Message = new Message;
  klasse: Klasse = new Klasse;
  user: User = new User;



  constructor() {

    this.user.childname = 'Ursli';
    this.klasse.title = 'Ase3';
    this.message.text = 'Lorem ';
  }

  ngOnInit() {
  }

}
