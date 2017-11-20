/**
 * Created by awedag on 12.10.17.
 */
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../_services/chat.service';
import { MessageDateBlock, MessageJson} from '../_models/message.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from '../_services/authentication.service';
import {UserAuthService} from "../_services/user-auth.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  public messageItem: MessageDateBlock[] = [new MessageDateBlock(new Date)];
  public message: MessageJson[] ;
  private chatSub: Subscription;
  private chatAuthoSub: Subscription;

  constructor( private messageItemService: ChatService
    , private router: Router
    , private userAuthService: UserAuthService) { }

  ngOnInit() {

    // subscribe to receive the message
    this.messageItemService.load()
      .subscribe((result) => {
        this.message = result;
        // prevent any empty message to be worked on
        if ( this.message === null || this.message.length === 0 ){
          return;
        }
        this.messageItem = this.message.sort(this.sortFunc)
          .reduce( this.reduceToGroup,  [new MessageDateBlock(new Date)] )  // pass in a new MessageDateBlock with a new date -> today
          .sort(this.sortFuncMi);
      });

    // read message from observable and subscribe to this chatstream to add them to the UI
    this.chatSub = this.messageItemService.readMessages()
      .subscribe(res => this.addMessage(res));

    // authentication returns only if there is a problem to solve
    this.chatAuthoSub = this.messageItemService.authentication()
      .subscribe(res => {console.log('chat.component call authentication:'  + res);
      this.router.navigate(['login'], {queryParams: {returnUrl: this.router.url}});
    });
  }

  public sortFunc(a: MessageJson, b: MessageJson): number {
    // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.sent_at).valueOf();
    const bb = new Date(b.sent_at).valueOf();
    return (aa - bb);

  }
  public sortFuncMi(a: MessageDateBlock, b: MessageDateBlock): number {
    // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.dateGroup).valueOf();
    const bb = new Date(b.dateGroup).valueOf();
    return (aa - bb);

  }
  public addMessage(messageJson: MessageJson){
    console.log('addMessage: ' + messageJson.sent_at);
    if (this.message) {
      this.message = [...this.message, messageJson];
    }
    else {
      this.message = [messageJson];
    }
    //this.messageItem = this.reduceToGroup(this.messageItem, newText);
    this.messageItem = this.message.sort(this.sortFunc)
      .reduce( this.reduceToGroup,  [new MessageDateBlock(new Date)] )  // pass in a new MessageDateBlock with a new date -> today
      .sort(this.sortFuncMi);
  }

  public onSend(newMessage: MessageJson) {
    newMessage.email =  this.userAuthService.getCurrentUsername();
    newMessage.sent_at = (new Date()).toJSON();

    this.addMessage(newMessage);
    this.messageItemService.sendMessage(newMessage);

  }

  private reduceToGroup(mia, x): MessageDateBlock[] {

    const mi = mia.find(t => t.dateGroup.toDateString() === new Date(x.sent_at).toDateString());
    if (!mi) {
      const miNew = new MessageDateBlock(new Date(x.sent_at));
      miNew.messages =  [x];
      mia = [...mia, miNew];
    }else {
      mi.messages = [...mi.messages || [], x];
    }
    return mia;
  }
}
