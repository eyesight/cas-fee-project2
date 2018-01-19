
import {Component} from '@angular/core';


@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html'
})
export class MessageBoxComponent {
  public hidden = true;
  public messageText: string = null;

  public subject: any;
  public origin: boolean;
  public callback: (o: boolean, d: boolean, T) => void;

  constructor() {
  }

  public showMBox<T>(msg: string, o: boolean, subject: T, callback: (o: boolean, d: boolean, sub: T) => void ) {
    this.messageText = msg;
    this.show();
    this.subject = subject;
    this.callback = callback;
    this.origin = o;
  }

  nok() {
    this.hide();
    this.sendAnswer(false);
  }
  ok() {
    this.hide();
    this.sendAnswer(true);
  }
  sendAnswer(decision: boolean) {
    if (this.callback) {
      this.callback(this.origin, decision, this.subject );
    }
  }

  show() {
    this.hidden = false;
  }
  hide() {
    this.hidden = true;
  }
}
