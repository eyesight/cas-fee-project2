/**
 * Created by awedag on 12.10.17.
 */
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Klasse } from '../_models/klasse.model';
import { ChatService } from '../_services/chat.service';
import { MessageItem, Message} from '../_models/message.model';
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
  public message: Message[] ;
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


    this.chatStream = this.messageItemService.readMessages();
    this.chatSub = this.chatStream.subscribe(res => this.addMessageFakeUser(res));

    this.chatAutho = this.messageItemService.authentication();
    this.chatAuthoSub = this.chatAutho.subscribe(res => {console.log('chat.component call authentication:'  + res);
      this.router.navigate(['login']);
    });

  }

  public sortFunc(a: Message, b: Message): number {
    // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.createdAt).valueOf();
    const bb = new Date(b.createdAt).valueOf();
    return (aa - bb);

  }
  public sortFuncMi(a: MessageItem, b: MessageItem): number {
    // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.dateGroup).valueOf();
    const bb = new Date(b.dateGroup).valueOf();
    return (aa - bb);

  }

  public addMessageFakeUser(text: string){
    const nm = new Message();
    nm.userName = 'Heidi';
    nm.text = text;
    const d = Date();
    nm.createdAt = d;
    this.addMessage(nm);
  }
  public addMessage(newText: Message){
    console.log('addMessage: ' + newText.text);
    if (this.message) {
      this.message = [...this.message, newText];
    }
    else {
      this.message = [newText];
    }
    this.messageItem = this.reduceToGroup(this.messageItem, newText);


  }

  public onSend(newText: Message) {

    this.addMessage(newText);
    this.messageItemService.sendMessage(newText.text);

  }
  private reduceToGroup(mia, x): MessageItem[] {

    const mi = mia.find(t => t.dateGroup.toDateString() === new Date(x.createdAt).toDateString());
    if (!mi) {
      const miNew = new MessageItem(new Date(x.createdAt));
      miNew.messages =  [x];
      mia = [...mia, miNew];
    }else {
      mi.messages = [...mi.messages || [], x];
    }
    return mia;
  }
}
