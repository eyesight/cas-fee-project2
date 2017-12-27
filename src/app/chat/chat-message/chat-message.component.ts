import { Component, OnInit, Input } from '@angular/core';

import { MessageDateBlock, Message, MessageJson } from '../../_models/message.model';
import { Klasse } from '../../_models/klasse.model';
import { UserClassListAvatars} from '../../_models/user.model';


@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html'
})
export class ChatMessageComponent implements OnInit {

  @Input()
  public message: MessageJson;

  @Input()
  public avatar: UserClassListAvatars;

  ngOnInit() {
  }

}
