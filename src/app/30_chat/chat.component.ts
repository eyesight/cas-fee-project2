/**
 * Created by awedag on 12.10.17.
 */
import { Component, OnInit } from '@angular/core';
import { Klasse } from '../model/klasse.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat-message.component.html'
})
export class ChatComponent implements OnInit {

  klasse: Klasse;

  constructor() { }

  ngOnInit() {
  }

}
