import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../_services/chat.service';
import {MessageCallback, MessageDateBlock, MessageJson} from '../_models/message.model';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {UserAuthService} from '../_services/user-auth.service';
import {AlertService} from '../_services/alert.service';
import {User, UserClassListAvatars} from '../_models/user.model';
import {UserContentService} from '../_services/user-content.service';
import {ClasslistAvatarService} from "../_services/user-classlist-avatars.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {

  public messageItem: MessageDateBlock[] = [new MessageDateBlock(new Date)];
  public message: MessageJson[] = null;
  public userContent: User = null;
  public connectionState = true;
  private socketSub: Subscription;
  private chatSub: Subscription;
  private chatAuthSub: Subscription;
  private chatErrorSub: Subscription;
  private chatConnectionStateSub: Subscription;
  private resendSub: Subscription;
  private client_uuid = 0;

  constructor(private chatService: ChatService
    , private router: Router
    , private userAuthService: UserAuthService
    , private userContentService: UserContentService
    , private alertService: AlertService) {
    console.log('chatComponent constructor');
  }

  ngOnInit() {
    this.chatService.setup();
    this.userContentService.getCurrentUserObserver()
      .subscribe((uc) => this.userContent = uc);
    console.log('ngOnInit: userContent.email:' + this.userContent.email);
    // subscribe to receive the message using normale JSON adapter
    this.onLoad();

    // read message from observable and subscribe to this chatstream to add them to the UI
    this.chatSub = this.chatService.readMessages()
      .subscribe(res => {
        res.success = true;
        this.addMessage(res);
      });

    // authentication returns only if there is a problem to solve
    this.chatAuthSub = this.chatService.authentication()
      .subscribe(res => {
        console.log('chat.component call authentication:' + res);
        this.alertService.error('newlogin');
        setTimeout(() =>
          this.router.navigate(['relogin'], {queryParams: {returnUrl: this.router.url}}), 3500);
      });

    this.chatErrorSub = this.chatService.readErrors()
      .subscribe(error => {
        console.log('chat.component call authentication:' + error);
        this.alertService.error('error' + error, false, 1000);
      });

    this.chatConnectionStateSub = this.chatService.connectionState()
      .subscribe(state => {
        console.log('connection:' + state);
        this.connectionState = state;
        if (state) {
          this.alertService.success('reconnected');
        } else {
          this.alertService.success('disconnected');
        }

        if (!this.message) {
          this.onLoad();
        }
      });

    this.resendSub = this.onResend();


  }

  ngOnDestroy() {
    console.log('Chat: ng destroy');
    this.socketSub.unsubscribe();
    this.chatAuthSub.unsubscribe();
    this.chatErrorSub.unsubscribe();
    this.chatConnectionStateSub.unsubscribe();
    this.chatSub.unsubscribe();
    this.resendSub.unsubscribe();

  }

  private onLoad() {
    if (this.socketSub) {
      this.socketSub.unsubscribe();
    }
    this.socketSub = this.chatService.load()
      .subscribe((result) => {
        if (!result) {
          return;
        }
        this.message = result;
        this.message.map(x => x.success = true);

        // prevent any empty message to be working on
        if (this.message === null || this.message.length === 0) {
          return;
        }

        this.messageItem = this.createMessageDateBlock();
      });
  }

  private onResend(): Subscription {

    return Observable.interval(5000)
      .subscribe(() => {
        if (this.message) {
          console.log('resending.... ');

          const msgResend: MessageJson[] = this.message.filter(x => !x.success);
          if (msgResend.length && this.connectionState) {
            console.log('resending amount of:' + msgResend.length);
            msgResend.forEach(x => this.sendMessageOverSocket(x));
          }
        }
      });
  }

  public onSend(newMessage: MessageJson) {
    newMessage.email = this.userAuthService.getCurrentUsername();
    newMessage.sent_at = (new Date()).toJSON();
    newMessage.saved_at = null;
    newMessage.success = false;
    newMessage.client_uuid = this.getuuid();

    this.addMessage(newMessage);

    this.sendMessageOverSocket(newMessage);

  }

  private sendMessageOverSocket(newMessage) {
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

        console.log('Promise reject on chatServie.sendMessage');
      });

  }

  private addMessage(messageJson: MessageJson) {

    // console.log('addMessage: ' + messageJson.sent_at);
    if (this.message) {
      this.message = [...this.message, messageJson];
    } else {
      this.message = [messageJson];
    }
    this.messageItem = this.createMessageDateBlock();

  }

  private updateMessage(msg: MessageJson, clientId) {
    if (this.message) {
      const ix = this.message.findIndex((x) => x.client_uuid === clientId);
      if (ix) {
        this.message[ix] = msg;
      }
    }
  }

  private createMessageDateBlock(): MessageDateBlock[] {
    return this.message.sort((a, b) => new Date(a.sent_at).valueOf() - new Date(b.sent_at).valueOf())
      .reduce(this.reduceToGroup, [new MessageDateBlock(new Date)])  // pass in a new MessageDateBlock with a new date -> today
      .sort((a, b) => new Date(a.dateGroup).valueOf() - new Date(b.dateGroup).valueOf());
  }

  private reduceToGroup(mia, x): MessageDateBlock[] {
    const mi = mia.find(t => t.dateGroup.toDateString() === new Date(x.sent_at).toDateString());
    if (!mi) {
      const miNew = new MessageDateBlock(new Date(x.sent_at));
      miNew.messages = [x];
      mia = [...mia, miNew];
    } else {
      mi.messages = [...mi.messages || [], x];
    }
    return mia;
  }

  private getuuid() {
    this.client_uuid = this.client_uuid + 1;
    return this.client_uuid;
  }

}
