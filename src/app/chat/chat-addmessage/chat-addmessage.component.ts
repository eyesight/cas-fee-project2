import {Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input} from '@angular/core';
import { ChatMessage } from '../../_models/message.model';
import { shortnameToUnicode } from 'emojione';
import {EmojiToUnicode} from "../../shared/emojione-short";

@Component({
  selector: 'app-chat-addmessage',
  templateUrl: './chat-addmessage.component.html'
})
export class ChatAddmessageComponent implements OnInit {
  @Output()
  public send: EventEmitter<ChatMessage> = new EventEmitter<ChatMessage>();
  @Input() cState  = true;
  message: ChatMessage = null;

  // create a reference to messageText inside the template
  @ViewChild('messageText') private messageText: ElementRef;

  constructor(private emojitransformer: EmojiToUnicode) { }

  ngOnInit() {
  }

  public onSend(newItemText) {
   // const conformText = newItemText.replace(/(?:\r\n|\r|\n)/g, '<br>');
    if (!newItemText) {
      return;
    }
    const msg = new ChatMessage();
    // convert text like :smile: to real smiley using emojione
    //msg.message = shortnameToUnicode(newItemText);
    msg.message = this.emojitransformer.transform(newItemText);

    msg.sent_at = Date();
    this.send.emit(msg);
    this.messageText.nativeElement.value = '';
  }

  public  onSubmit( event: Event) {
    event.preventDefault();
  }

}
