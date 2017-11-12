/**
 * Created by awedag on 12.10.17.
 */
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../_services/chat.service';
import { MessageItem, MessageJson} from '../_models/message.model';
import {formatMoment} from 'ngx-bootstrap/bs-moment/format';
import { dateFormat } from 'dateformat';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../_services/authentication.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  public messageItem: MessageItem[] = [new MessageItem(new Date)];
  public message: MessageJson[] ;
  private chatStream: Observable<any>;
  private chatSub: Subscription;
  private chatAutho: Observable<any>;
  private chatAuthoSub: Subscription;

  constructor( private messageItemService: ChatService
    , private el: ElementRef
    , private router: Router
    , private authService: AuthenticationService) { }

  ngOnInit() {
    console.log('ngOnInit in chatcOmponetn');
    this.messageItemService.load()
      .subscribe((result) => {
        this.message = result;
        this.messageItem = this.message.sort(this.sortFunc)
          .reduce( this.reduceToGroup,  [new MessageItem(new Date)] )  // pass in a new MessageItem with a new date -> today
          .sort(this.sortFuncMi);
      });

    // read message from observable and subscribe to this chatstream to add them to the UI
    this.chatStream = this.messageItemService.readMessages();
    this.chatSub = this.chatStream.subscribe(res => this.addMessage(res));

    this.chatAutho = this.messageItemService.authentication();
    this.chatAuthoSub = this.chatAutho.subscribe(res => {console.log('chat.component call authentication:'  + res);
      this.router.navigate(['login']);
    });

  }

  public sortFunc(a: MessageJson, b: MessageJson): number {
    // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.sent_at).valueOf();
    const bb = new Date(b.sent_at).valueOf();
    return (aa - bb);

  }
  public sortFuncMi(a: MessageItem, b: MessageItem): number {
    // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.dateGroup).valueOf();
    const bb = new Date(b.dateGroup).valueOf();
    return (aa - bb);

  }

  public addMessageFakeUser(text: string){
    const nm = new MessageJson();
    nm.email = 'Heidi';
    nm.message = text;
    const d = Date();
    nm.sent_at = d;
    this.addMessage(nm);
  }
  public addMessage(messageJson: MessageJson){
    console.log('addMessage: ' + messageJson.message);
    if (this.message) {
      this.message = [...this.message, messageJson];
    }
    else {
      this.message = [messageJson];
    }
    //this.messageItem = this.reduceToGroup(this.messageItem, newText);
    this.messageItem = this.message.sort(this.sortFunc)
      .reduce( this.reduceToGroup,  [new MessageItem(new Date)] )  // pass in a new MessageItem with a new date -> today
      .sort(this.sortFuncMi);
  }

  public onSend(newMessage: MessageJson) {
    console.log('onSend');
    console.dir(newMessage);
    newMessage.email =  this.authService.getCurrentUsername();
    this.addMessage(newMessage);
    this.messageItemService.sendMessage(newMessage.message);

  }
  private reduceToGroup(mia, x): MessageItem[] {

    const mi = mia.find(t => t.dateGroup.toDateString() === new Date(x.sent_at).toDateString());
    if (!mi) {
      const miNew = new MessageItem(new Date(x.sent_at));
      miNew.messages =  [x];
      mia = [...mia, miNew];
    }else {
      mi.messages = [...mi.messages || [], x];
    }
    return mia;
  }
}
