import { Component, OnInit, Input } from '@angular/core';
import { MessageDateBlock } from '../../_models/message.model';

@Component({
  selector: 'app-chat-date',
  templateUrl: './chat-date.component.html'
})
export class ChatDateComponent implements OnInit {

  @Input()
  public messageItem: MessageDateBlock;

  constructor() {
  }

  ngOnInit() {
  }

}
