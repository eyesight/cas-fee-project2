import {Component, EventEmitter, OnInit, Output, ViewChild, ElementRef, Input} from '@angular/core';
import { ChatMessage } from '../../_models/message.model';
import { EmojiToUnicode } from '../../_services/emoji-to-unicode';
import {AlertService} from '../../_services/alert.service';
import {AlertMessagesService} from '../../_services/alert-messages.service';

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

  constructor(
    private emojitransformer: EmojiToUnicode,
    private alertService: AlertService,
    private ams: AlertMessagesService) {
  }

  ngOnInit() {
  }

  public onSend(newItemText) {
    if (!newItemText) {
      return;
    }
    // 5000 characters are enough - dont want to crash the system or the db
    if (newItemText.length > 5000) {
      this.alertService.error(this.ams.MessagesError.chatMaxLength, true);
      return;
    }

    const msg = new ChatMessage();
    // convert text like :-) to real smiley
    msg.message = this.emojitransformer.transform(newItemText);

    msg.sent_at = Date();
    this.send.emit(msg);
    this.messageText.nativeElement.value = '';
  }

  public  onSubmit( event: Event) {
    event.preventDefault();
  }

}
