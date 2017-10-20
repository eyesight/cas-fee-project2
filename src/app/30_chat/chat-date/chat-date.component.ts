import { Component, OnInit, Input } from '@angular/core';
import { MessageItem } from '../../model/messageItem.model';
import { FromNowPipe } from '../services/fromNow.pipe';

@Component({
  selector: 'app-chat-date',
  templateUrl: './chat-date.component.html',
  styleUrls: ['./chat-date.component.scss']
})
export class ChatDateComponent implements OnInit {

  @Input()
  public messageItem: MessageItem;

  constructor() {
  // this.messageItem.createdAt = new Date('12:00').toDateString();
  }

  ngOnInit() {
  }

}
