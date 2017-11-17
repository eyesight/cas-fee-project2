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
    this.send.emit({message: newItemText, sent_at: Date(), email: 'Seepli', client_uuid: null});
    this.messageText.nativeElement.value = '';
  }

  public  onSubmit( event: Event) {
    event.preventDefault();
  }
  keyDownFunction(event) {
    if(event.keyCode === 13) {
      // AngularBug: prevent to reload the page on Enter


      // rest of your code
      // this.messageText.nativeElement.value = this.messageText.nativeElement.value + 13;
    }
  }
}
