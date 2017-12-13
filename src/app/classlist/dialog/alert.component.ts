/**
 * Created by awedag on 08.12.17.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User, UserApproveAnswer} from "../../_models/user.model";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent {
  hidden = true;
  private messageText: string = null;
  private approve: UserApproveAnswer = new UserApproveAnswer;

  @Input()
  public userItem: User = null;

  @Output()
  public answer: EventEmitter<UserApproveAnswer> = new EventEmitter<UserApproveAnswer>();

  show(msg: string, approve: boolean) {
    this.messageText = msg;
    this.hidden = false;
    this.approve.approve = approve;
  }

  nok() {
    this.hide();
    this.approve.changed = false;
    this.sendAnswer();
  }
  ok() {
    this.hide();
    this.approve.changed = true;
    this.sendAnswer();
  }
  sendAnswer() {
    this.approve.userItem = this.userItem;
    this.answer.emit(this.approve);
  }


  hide() {
    this.hidden = true;
  }
}
