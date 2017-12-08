/**
 * Created by awedag on 08.12.17.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User, UserApproveAnswer} from "../../_models/user.model";

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="!hidden">
      <div class="mmbackdrop" (click)="hide()"></div>
      <div class="mmmodal">
        <ng-content></ng-content>
        <div>
          <p>{{messageText}} </p>
          <button (click)="ok()">OK</button>
        </div>
        <div>
          <button (click)="nok()">Abbrechen</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .mmmodal {
      position: fixed;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border: 1px solid #ddd;
      padding: 1rem;
    }

    .mmbackdrop {
      position: absolute;
      background: rgba(0, 0, 0, 0.1);
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  `]
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
