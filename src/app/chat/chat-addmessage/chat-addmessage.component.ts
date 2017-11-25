import {Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input} from '@angular/core';
import { MessageJson } from '../../_models/message.model';


@Component({
  selector: 'app-chat-addmessage',
  templateUrl: './chat-addmessage.component.html'
})
export class ChatAddmessageComponent implements OnInit {
  @Output()
  public send: EventEmitter<MessageJson> = new EventEmitter<MessageJson>();
  @Input() cState: boolean = true;
  message: MessageJson = null;

  // create a reference to messageText inside the template
  @ViewChild('messageText') private messageText: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  public onSend(newItemText) {
   // const conformText = newItemText.replace(/(?:\r\n|\r|\n)/g, '<br>');
    if (!newItemText) {
      return;
    }
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
