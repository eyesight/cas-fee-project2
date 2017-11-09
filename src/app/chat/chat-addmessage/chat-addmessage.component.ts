import {Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Message, MessageJson } from '../../_models/message.model';


@Component({
  selector: 'app-chat-addmessage',
  templateUrl: './chat-addmessage.component.html'
})
export class ChatAddmessageComponent implements OnInit {
  @Output()
  public send: EventEmitter<MessageJson> = new EventEmitter<MessageJson>();
  message: MessageJson = null

  // create a reference to messageText inside the template
  @ViewChild('messageText') private messageText: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public onSend(newItemText) {
    this.send.emit({message: newItemText, sent_at: Date(), email: 'Seepli', client_uuid: null});
    this.messageText.nativeElement.value = '';
  }

}
