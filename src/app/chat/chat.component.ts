/**
 * Created by awedag on 12.10.17.
 */
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../_services/chat.service';
import {MessageCallback, MessageDateBlock, MessageJson} from '../_models/message.model';
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
  private client_uuid:number = 0;

  constructor( private chatService: ChatService
    , private router: Router
    , private userAuthService: UserAuthService) { }

  ngOnInit() {

    // subscribe to receive the message
    this.chatService.load()
      .subscribe((result) => {
        this.message = result;
        // prevent any empty message to be worked on
        if ( this.message === null || this.message.length === 0 ){
          return;
        }
        this.messageItem = this.createMessageDateBlock();
        /*  this.message.sort(this.sortFunc)
          .reduce( this.reduceToGroup,  [new MessageDateBlock(new Date)] )  // pass in a new MessageDateBlock with a new date -> today
          .sort(this.sortFuncMi);*/
      });

    // read message from observable and subscribe to this chatstream to add them to the UI
    this.chatSub = this.chatService.readMessages()
      .subscribe(res => this.addMessage(res));

    // authentication returns only if there is a problem to solve
    this.chatAuthoSub = this.chatService.authentication()
      .subscribe(res => {console.log('chat.component call authentication:'  + res);
      this.router.navigate(['login'], {queryParams: {returnUrl: this.router.url}});
    });
  }

  public addMessage(messageJson: MessageJson){
    console.log('addMessage: ' + messageJson.sent_at);
    if (this.message) {
      this.message = [...this.message, messageJson];
    } else {
      this.message = [messageJson];
    }
    this.messageItem = this.createMessageDateBlock();

  }

  public onSend(newMessage: MessageJson) {
    newMessage.email =  this.userAuthService.getCurrentUsername();
    newMessage.sent_at = (new Date()).toJSON();
    newMessage.saved_at = null;
    newMessage.client_uuid = this.getuuid();

    this.addMessage(newMessage);

    this.chatService.sendMessage(newMessage)
      .then((msg: MessageCallback) => {
          newMessage.saved_at = msg.server_saved_at;
          this.updateMessage(newMessage, newMessage.client_uuid);
      });
      //.catch((err) => {console.log('Promise reject on chatServie.sendMessage'); } );

  }
  private createMessageDateBlock(): MessageDateBlock[] {
   return this.message.sort((a, b) => new Date(a.sent_at).valueOf() - new Date(b.sent_at).valueOf())
      .reduce( this.reduceToGroup,  [new MessageDateBlock(new Date)] )  // pass in a new MessageDateBlock with a new date -> today
      .sort(( a, b ) => new Date(a.dateGroup).valueOf() - new Date(b.dateGroup).valueOf());
  }

  private updateMessage(msg: MessageJson, clientId){
    //console.log('updatemessage' + this.message.length);
    if (this.message) {
      const ix = this.message.findIndex( (x) => x.client_uuid === clientId);
      if (ix) {
        this.message[ix] = msg;
       // console.log('message updated to :'+clientId);
      }
    }
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
  private getuuid() {
    this.client_uuid = this.client_uuid + 1;
    return this.client_uuid;
  }
}
