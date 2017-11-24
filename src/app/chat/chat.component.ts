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
import {AlertService} from "../_services/alert.service";
// import { MdSnackBar } from '@angular/material';
//import {MatSnackBarModule} from '@angular/material/snack-bar'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  public messageItem: MessageDateBlock[] = [new MessageDateBlock(new Date)];
  public message: MessageJson[] ;
  private chatSub: Subscription;
  private chatAuthoSub: Subscription;
  private client_uuid = 0;

  constructor( private chatService: ChatService
    , private router: Router
    , private userAuthService: UserAuthService
    , private alertService: AlertService
  //  , private snackBar: MdSnackBar
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
    this.chatAuthoSub = this.chatService.authentication()
      .subscribe(res => {
      console.log('chat.component call authentication:'  + res);
      this.alertService.error('Sie müssen sich neu anmelden .. Sie werden weitergeleitet');
      //  this.snackBar.open('Sie müssen sich neu anmelden .. Sie werden weitergeleitet', null, { duration: 1500 });
      //  this.matSnackBar.open('Meldung abgespei');

        setTimeout(() =>
         this.router.navigate(['login'], {queryParams: {returnUrl: this.router.url}}), 1000);
    });
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
      //  this.snackBar.open('Meldung abgespeichert', null, { duration: 500 });
        this.alertService.success('Chat abgespeichert um:' + msg.server_saved_at, false, 2000);

        this.updateMessage(newMessage, newMessage.client_uuid);
      })
      .catch((err) => {
       this.alertService.error('Fehler beim Abschicken');
      console.log('Promise reject on chatServie.sendMessage'); } );

  }
  private addMessage(messageJson: MessageJson){

    console.log('addMessage: ' + messageJson.sent_at);
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
