import {Component, OnInit, OnDestroy, ViewChild, ElementRef, Directive} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../_services/chat.service';
import {MessageCallback, MessageDateBlock, ChatMessage} from '../_models/message.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import {Subscription} from 'rxjs/Subscription';
import {UserAuthService} from '../_services/user-auth.service';
import {AlertService} from '../_services/alert.service';
import {User} from '../_models/user.model';
import {UserContentService} from '../_services/user-content.service';
import {AppScrollBottomDirective} from '../_directives/scroll-bottom.directive';
import {AlertMessagesService} from '../_services/alert-messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {


  @ViewChild('ScrollTo') private scrollDirective: AppScrollBottomDirective;

  public messageItem: MessageDateBlock[] = [new MessageDateBlock(new Date)];
  public message: ChatMessage[] = null;
  public userContent: User = null;
  public connectionState = true;
  private socketSub: Subscription;
  private chatSub: Subscription;
  private chatAuthSub: Subscription;
  private chatErrorSub: Subscription;
  private chatConnectionStateSub: Subscription;
  private resendSub: Subscription;
  private userContentSub: Subscription;
  private client_uuid = 0;

  constructor(
    private chatService: ChatService,
    private router: Router,
    private userAuthService: UserAuthService,
    private userContentService: UserContentService,
    private alertService: AlertService,
    private ams: AlertMessagesService) {
  }

  public ngOnInit() {
    this.chatService.setup();
    this.userContentSub =  this.userContentService.getCurrentUserObserver()
      .subscribe((uc) => this.userContent = uc);
    // subscribe to receive the message using normale JSON adapter
    this.onLoad();

    // read message from observable and subscribe to this chatstream to add them to the UI
    this.chatSub = this.chatService.readMessages()
      .subscribe(res => {
        res.success = true;
        this.addMessage(res);
        this.scrollDirective.scrollNow();
      });

    // authentication returns only if there is a problem to solve
    this.chatAuthSub = this.chatService.authentication()
      .subscribe(res => {
        this.alertService.error(this.ams.MessagesError.newlogin);
        setTimeout(() =>
          this.router.navigate(['relogin'], {queryParams: {returnUrl: this.router.url}}), 3500);
      });

    this.chatErrorSub = this.chatService.readErrors()
      .subscribe(error => {
        console.log('chat.component call authentication:' + error);
        this.alertService.error(this.ams.MessagesError.error, false, 1000);
      });

    this.chatConnectionStateSub = this.chatService.connectionState()
      .subscribe(state => {
        this.connectionState = state;

        if (!this.message) {
          this.onLoad();
        }
      });

    this.resendSub = this.onResend();


  }

  public ngOnDestroy() {
    if (this.socketSub) { this.socketSub.unsubscribe(); }
    if (this.chatAuthSub) { this.chatAuthSub.unsubscribe(); }
    if (this.chatErrorSub) { this.chatErrorSub.unsubscribe(); }
    if (this.chatConnectionStateSub) { this.chatConnectionStateSub.unsubscribe(); }
    if (this.chatSub) { this.chatSub.unsubscribe(); }
    if (this.resendSub) { this.resendSub.unsubscribe(); }
    if (this.userContentSub) { this.userContentSub.unsubscribe(); }
  }

  private onLoad() {
    if (this.socketSub) {
      this.socketSub.unsubscribe();
    }
    // get all messages for me (initial load)
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
      },  error => {
        if (error.toString().match(/401/g)) {
          this.alertService.error(this.ams.MessagesError.authorization, true);
          this.router.navigate(['/relogin']);
        } else {
          this.alertService.error(this.ams.MessagesError.error, true);
        }
      });
  }

  // socket.io has a problem that is sometimes
  // looses messages once getting online again -> so thats why we need to use own logic for resending
  private onResend(): Subscription {

    return Observable.interval(5000)
      .subscribe(() => {
        if (this.message) {
          console.log('resending.... ');

          const msgResend: ChatMessage[] = this.message.filter(x => !x.success);
          if (msgResend.length && this.connectionState) {
            console.log('resending amount of:' + msgResend.length);
            msgResend.forEach(x => this.sendMessageOverSocket(x));
          }
        }
      });
  }

  public onSend(newMessage: ChatMessage) {
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

        this.updateMessage(newMessage, newMessage.client_uuid);
      })
      .catch((err) => {
        if (err.toString().match(/401/g)) {
          this.alertService.error(this.ams.MessagesError.authorization, true);
          this.router.navigate(['/relogin']);
        } else {
          if (this.connectionState) {
            this.alertService.error(this.ams.MessagesError.error, true);
          }
        }
        console.log('Promise reject on chatServie.sendMessage:' + err.toString());
      });

  }

  private addMessage(messageJson: ChatMessage) {
    if (this.message) {
      this.message = [...this.message, messageJson];
    } else {
      this.message = [messageJson];
    }
    this.messageItem = this.createMessageDateBlock();

  }

  private updateMessage(msg: ChatMessage, clientId) {
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
