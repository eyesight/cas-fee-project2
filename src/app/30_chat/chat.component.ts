/**
 * Created by awedag on 12.10.17.
 */
import { Component, OnInit } from '@angular/core';
import { Klasse } from '../model/klasse.model';
import { MessageItemService } from '../services/messageItem.service';
import { MessageItem, Message} from '../model/messageItem.model';
import {formatMoment} from 'ngx-bootstrap/bs-moment/format';
import { dateFormat } from 'dateformat';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  public messageItem: MessageItem[];
  //= new Array<MessageItem>(new MessageItem( new Date() ));
  public message: Message[];

  constructor( private messageItemService: MessageItemService) { }

  ngOnInit() {
    this.messageItemService.load()
      .subscribe((result) => {

        this.message = result;
        this.messageItem = this.message.sort(this.sortFunc)
          .reduce( this.reduceToGroup, new Array<MessageItem>(new MessageItem( new Date() )))
          .sort(this.sortFuncMi);
      });

  }

  public sortFunc(a: Message, b: Message) {
    // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.createdAt).valueOf();
    const bb = new Date(b.createdAt).valueOf();
    return (aa - bb);

  }
  public sortFuncMi(a: MessageItem, b: MessageItem) {
    // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.dateGroup).valueOf();
    const bb = new Date(b.dateGroup).valueOf();
    return (aa - bb);

  }

  public onSend(newText: Message) {
    console.log('onSend on chat.component:' + newText.createdAt);
    this.message.push(newText);
    this.messageItem = this.reduceToGroup(this.messageItem,newText);

  }
  private reduceToGroup = (mia, x) => {

    const mi = mia.find(t => t.dateGroup.toDateString() === new Date(x.createdAt).toDateString());
    if (!mi) {
      const miNew = new MessageItem(new Date(x.createdAt));
      miNew.messages =  [x];
      mia = [...mia, miNew];
    }else {
      if (!mi.messages) {
        mi.messages =  [x];
      }else {
        mi.messages = [...mi.messages, x];
      }
    }
    return mia;
  }
}
