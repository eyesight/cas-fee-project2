
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

  public nok() {
    this.hide();
    this.sendAnswer(false);
  }

  public ok() {
    this.hide();
    this.sendAnswer(true);
  }

  public sendAnswer(decision: boolean) {
    if (this.callback) {
      this.callback(this.origin, decision, this.subject );
    }
  }

  public show() {
    this.hidden = false;
  }

  public hide() {
    this.hidden = true;
  }
}
