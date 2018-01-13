
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User, UserApproveAnswer} from '../../_models/user.model';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html'
})
export class MessageBoxComponent implements OnInit {
  hidden = true;
  public messageText: string = null;
  private approve: UserApproveAnswer = new UserApproveAnswer;

  @Input()
  public userItem: User = null;

  @Output()
  public answer: EventEmitter<UserApproveAnswer> = new EventEmitter<UserApproveAnswer>();

  constructor() {
  }

  ngOnInit() {
    console.log('msboxng onOInit:' + this.userItem.email);
  }

  show(msg: string, approve: boolean) {
    this.messageText = msg;
    this.hidden = false;
    this.approve.approve = approve;
    console.log('msbox:' + this.userItem.email);
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
