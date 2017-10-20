import {Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../../model/messageItem.model';


@Component({
  selector: 'app-chat-addmessage',
  templateUrl: './chat-addmessage.component.html'
})
export class ChatAddmessageComponent implements OnInit {
  @Output()
  public send: EventEmitter<Message> = new EventEmitter<Message>();
  message: Message = null

  // create a reference to messageText inside the template
  @ViewChild('messageText') private messageText: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public onSend(newItemText) {
    this.send.emit({text: newItemText, createdAt: Date(), userName: 'Seepli', klasseName: 'a3d', messageId: '333'});
    this.messageText.nativeElement.value = '';
  }

}
