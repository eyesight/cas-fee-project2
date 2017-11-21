import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
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
   // const conformText = newItemText.replace(/(?:\r\n|\r|\n)/g, '<br>');
    const msg = new MessageJson();
    msg.message = newItemText;
    msg.sent_at = Date();
    this.send.emit(msg);
    this.messageText.nativeElement.value = '';
  }

  public  onSubmit( event: Event) {
    event.preventDefault();
  }

}
