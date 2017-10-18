/**
 * Created by awedag on 12.10.17.
 */
import { Component, OnInit } from '@angular/core';
import { Klasse } from '../model/klasse.model';
import { MessageItemService } from '../services/messageItem.service';
import { MessageItem, Message} from '../model/messageItem.model';
import {formatMoment} from "ngx-bootstrap/bs-moment/format";
import { dateFormat } from 'dateformat';
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  public messageItem: MessageItem[] = new Array<MessageItem>();
  public message: Message[];

  constructor( private messageItemService: MessageItemService) { }

  ngOnInit() {
    this.messageItemService.load()
      .subscribe((result) => {

      // TODO: refactoring
        this.message = result;
        this.message.forEach( (x) => console.log('x is:' + x.userName) );
        this.message.sort(this.sortFunc);
        this.message.forEach( (x) => {

          if (this.messageItem.length === 0 ) {
            console.log('a');

            const mi: MessageItem = new MessageItem();
            mi.date = new Date(x.createdAt);
          //  console.log('aa');
            mi.dateGroup = new Date(mi.date.toDateString());
          //  console.log('bb');
            mi.messages = new Array<Message>();
            mi.messages.push(x);
            this.messageItem.push(mi);
            console.log('first:date:' + mi.dateGroup);

          }
          else {
            const dg =  new Date(x.createdAt);

            const mit = this.messageItem.find( t => t.dateGroup.toDateString() === dg.toDateString() );


            if (mit) {
              console.log('mit is alive:' + mit.dateGroup);
             // mit.messages = new Array<Message>();
              mit.messages.push(x);

            }
            else
              {
              console.log('mit not found');
              const mip: MessageItem = new MessageItem();
              mip.date = new Date(x.createdAt);
              //  console.log('aa');
              mip.dateGroup = new Date(mip.date.toDateString());
              //  console.log('bb');
              mip.messages = new Array<Message>();
              mip.messages.push(x);
              this.messageItem.push(mip);

            }

          }
        });



      });
    //console.log('component.ngOnInit:'+this.messageItem)});
  }

  public sortFunc(a: Message, b: Message) {
   // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.createdAt).valueOf();
    const bb = new Date(b.createdAt).valueOf();
   // console.log('a:'+ a.createdAt + ':aa:' + aa +  'b:' + b.createdAt + ':bb:' + bb);

    return (aa - bb);


  }
/*
  public findGroup(x: MessageItem, d: String) {
    return x.dateGroup.toDateString() -  d;
  }*/
}
