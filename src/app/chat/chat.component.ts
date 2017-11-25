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
import {AlertService} from "../_services/alert.service"; import { MatSnackBar } from "@angular/material";

//import { MdSnackBar } from '@angular/material';

// MAtSnackBar isnt working properly - unstyled duplicate element
// import { MatSnackBar } from '@angular/material';

//import {MatSnackBarModule} from '@angular/material/snack-bar'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  public messageItem: MessageDateBlock[] = [new MessageDateBlock(new Date)];
  public message: MessageJson[] = null;
  public connectionState = true;
  private chatSub: Subscription;
  private chatAuthSub: Subscription;
  private chatErrorSub: Subscription;
  private chatConnectionStateSub: Subscription;
  private client_uuid = 0;

  constructor( private chatService: ChatService
    , private router: Router
    , private userAuthService: UserAuthService
    , private alertService: AlertService
   // , private snackBar: MatSnackBar
   // , private matSnackBar: MatSnackBarModule
  ) { }

  ngOnInit() {
    // subscribe to receive the message using normale JSON adapter
    this.chatService.load()
      .subscribe((result) => {
        if (!result) {
          return;
        }
        this.message = result;
        this.message.map(x => x.success = true);

        // prevent any empty message to be worked on
        if ( this.message === null || this.message.length === 0 ){
          return;
        }

        this.messageItem = this.createMessageDateBlock();
      });

    // read message from observable and subscribe to this chatstream to add them to the UI
    this.chatSub = this.chatService.readMessages()
      .subscribe(res => this.addMessage(res));

    // authentication returns only if there is a problem to solve
    this.chatAuthSub = this.chatService.authentication()
      .subscribe(res => {
      console.log('chat.component call authentication:'  + res);
     // this.alertService.error('Sie müssen sich periodisch neu anmelden',false, 1000);
     //this.snackBar.open('Sie müssNNNNen sich neu anmelden .. Sie werden weitergeleitet', null, { duration: 1500 });
      //  this.matSnackBar.open('Meldung abgespei');

        setTimeout(() =>
         this.router.navigate(['login'], {queryParams: {returnUrl: this.router.url}}), 1000);
    });

    this.chatErrorSub = this.chatService.readErrors()
      .subscribe(error => {
        console.log('chat.component call authentication:'  + error);
        this.alertService.error('Fehler ' + error, false, 1000);
      });

    this.chatConnectionStateSub = this.chatService.connectionState()
    .subscribe(state => {
        console.log('connection:'  + state);
        this.connectionState = state;
        this.alertService.success('Connection ' + state, false, 1000);
      });

    this.onResend();

  }
  private onResend() {
    /*console.log('resending.... ');

    if (this.message) {
      const msgResend: MessageJson[] = this.message.filter(x => !x.success);
      if (msgResend.length && this.connectionState) {
        console.log('resending amount of:' + msgResend.length );
        msgResend.forEach(x => this.sendMessageOverSocket(x));
      }
    }

      setTimeout(() => this.onResend(), 5000);
      */
  }
  public onSend(newMessage: MessageJson) {
    newMessage.email =  this.userAuthService.getCurrentUsername();
    newMessage.sent_at = (new Date()).toJSON();
    newMessage.saved_at = null;
    newMessage.success = false;
    newMessage.client_uuid = this.getuuid();

    this.addMessage(newMessage);

    this.sendMessageOverSocket(newMessage);

  }

  private sendMessageOverSocket(newMessage){
    this.chatService.sendMessage(newMessage)
      .then((msg: MessageCallback) => {
        newMessage.saved_at = msg.server_saved_at;
        newMessage.success = true;
        console.log('then');
        //    this.snackBar.open('Chat abgespeichert um:' + msg.server_saved_at, null, { duration: 500 });

        this.updateMessage(newMessage, newMessage.client_uuid);
      })
      .catch((err) => {
        //   this.alertService.error('Fehler beim Senden',false, 1000);

        console.log('Promise reject on chatServie.sendMessage'); } );

  }
  private addMessage(messageJson: MessageJson){

   // console.log('addMessage: ' + messageJson.sent_at);
    if (this.message) {
      this.message = [...this.message, messageJson];
    } else {
      this.message = [messageJson];
    }
    this.messageItem = this.createMessageDateBlock();

  }
  private updateMessage(msg: MessageJson, clientId){
    if (this.message) {
      const ix = this.message.findIndex( (x) => x.client_uuid === clientId);
      if (ix) {
        this.message[ix] = msg;
      }
    }
  }
  private createMessageDateBlock(): MessageDateBlock[] {
    return this.message.sort((a, b) => new Date(a.sent_at).valueOf() - new Date(b.sent_at).valueOf())
      .reduce( this.reduceToGroup,  [new MessageDateBlock(new Date)] )  // pass in a new MessageDateBlock with a new date -> today
      .sort(( a, b ) => new Date(a.dateGroup).valueOf() - new Date(b.dateGroup).valueOf());
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
