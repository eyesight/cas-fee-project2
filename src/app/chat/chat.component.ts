/**
 * Created by awedag on 12.10.17.
 */
import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
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
  @ViewChild('scrollBottom') private scrollBottom: ElementRef;

  constructor( private messageItemService: ChatService
    , private el: ElementRef
    , private router: Router
    , private authService: AuthenticationService) { }

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
          .reduce( this.reduceToGroup,  [new MessageItem(new Date)] )  // pass in a new MessageItem with a new date -> today
          .sort(this.sortFuncMi);
      });

    // read message from observable and subscribe to this chatstream to add them to the UI
    this.chatSub = this.messageItemService.readMessages()
      .subscribe(res => {console.dir(res);});

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
  public sortFuncMi(a: MessageItem, b: MessageItem): number {
    // console.log('a:'+ a.createdAt + 'b:' + b.createdAt);
    const aa = new Date(a.dateGroup).valueOf();
    const bb = new Date(b.dateGroup).valueOf();
    return (aa - bb);

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
  public ngAfterViewChecked() {
    this.scrollToBottom();
  }
  public onSend(newMessage: MessageJson) {
    newMessage.email =  this.authService.getCurrentUsername();
    newMessage.sent_at = (new Date()).toJSON();

    this.addMessage(newMessage);
    this.messageItemService.sendMessage(newMessage);

  }
  private scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch(err) { }
  }

  private textAreaAdjust(){
  //  this.textArea.style.height = 'auto';
  //  this.textArea.style.height = this.textArea.scrollHeight + 'px';
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
