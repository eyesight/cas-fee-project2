import {Component, EventEmitter, Input, OnInit, Output, ViewChild, OnDestroy} from '@angular/core';
import {User, UserApproveAnswer} from '../../_models/user.model';
import {ClasslistService} from '../service/classlist.service';
import {MessageBoxComponent} from '../../_directives/message-box/message-box.component';
import {AlertService} from '../../_services/alert.service';
import {Subscription} from 'rxjs/Subscription';


enum FIELDS {
  C_FORENAME = 0,
  C_SURNAME,
  P_FORENAME,
  P_SURNAME,
  PLACE
}


class SortClass {
  constructor() {
  }

  public up = false;
  public down = false;
  public sortFn: (a: User, b: User) => number;
}

declare function sfn(a: User, b: User): number;

@Component({
  selector: 'app-classlist-list',
  templateUrl: './classlist-list.component.html'
})

export class ClasslistListComponent implements OnInit, OnDestroy {

  public canDeactivate = true;

  @Input()
  classlistList: User[] = null;

  @Input()
  userCurrent: User = null;

  @Output()
  public approveAnswer: EventEmitter<boolean> = new EventEmitter<boolean>();


  @ViewChild(MessageBoxComponent) alert: MessageBoxComponent;

  public sortGoals: SortClass[] = [
    {up: false, down: false, sortFn: this.sfCF},
    {up: false, down: false, sortFn: this.sfCS},
    {up: false, down: false, sortFn: this.sfPF},
    {up: false, down: false, sortFn: this.sfPS},
    {up: false, down: false, sortFn: this.sfPL}
  ];
  private sorFn = this.sfPF;
  public SortFields = FIELDS;
  private approveSub: Subscription = null;


  constructor(private classlistService: ClasslistService,
              private alertService: AlertService) {
  }

  ngOnInit() {
  }


  ngOnDestroy() {
    if (this.approveSub ) {
      this.approveSub.unsubscribe();
    }
  }
  showAlert(item: User, checked: any) {
    console.log('checked?' + checked.target.checked);
    this.classlistList[this.classlistList.findIndex((x) => x === item)].is_approved = checked.target.checked;

    this.canDeactivate = false;
    this.canDeactivateSend(this.canDeactivate);
    if (checked.target.checked) {
      this.alert.show('Möchten Sie die Person wirklich bestätigen?', true);
    } else {
      this.alert.show('Möchten Sie die Person wirklich ablehnen? Person kann danach das System nicht mehr benutzen', false);
    }
  }

  public sendAnswer(val: UserApproveAnswer) {
    console.log('SendAnswer - ok?:' + val.approve + '::' + val.changed + '::' + val.userItem.email);
    this.canDeactivate = true;
    this.canDeactivateSend(this.canDeactivate);

    if (val.changed) {
      this.onChecked(val.userItem, val.approve);
    } else {

      // set approve back to what it was before
      this.classlistList[this.classlistList.findIndex((x) => x === val.userItem)].is_approved = !val.approve;
      this.classlistList = [...this.classlistList];
    }

  }

  public canDeactivateSend(val: boolean) {
    this.approveAnswer.emit(val);

  }

  public onChecked(item: User, checked: boolean) {
    this.approveSub = this.classlistService.approveUser(item, (checked === true ? 1 : 0))
      .subscribe((x) => {
          console.log('approved');
        },
        (error) => {
          this.alertService.error('error' + error, false, 2000);
        });
  }

  public onSortGoal(id: number) {
    if (this.sortGoals.length <= id) {
      // prevent crash
      return;
    }
    this.sorFn = this.sortGoals[id].sortFn;
    if (this.sortGoals[id].up) {
      this.sortGoals[id].up = false;
      this.sortGoals[id].down = true;
      this.classlistList = this.classlistList.sort((a, b) => this.sorFn(b, a));
    } else {
      this.sortGoals[id].up = true;
      this.sortGoals[id].down = false;
      this.classlistList = this.classlistList.sort((a, b) => this.sorFn(a, b));
    }
    // reset other class.zz_..
    this.sortGoals = this.sortGoals.map((x, ix) => {
      // only reset all others control
      if (id !== ix) {
        x.up = false;
        x.down = false;
      }
      return x;
    });
  }

  private sfPF(a: User, b: User) {
    return this.sortFunc(a.parent_forename, b.parent_forename);
  }

  private sfPS(a: User, b: User) {
    return this.sortFunc(a.parent_surname, b.parent_surname);
  }

  private sfCF(a: User, b: User) {
    return this.sortFunc(a.child_forename, b.child_forename);
  }

  private sfCS(a: User, b: User) {
    return this.sortFunc(a.child_surname, b.child_surname);
  }

  private sfPL(a: User, b: User) {
    return this.sortFunc(a.place, b.place);
  }

  public sortFunc(a: string, b: string): number {
    if (!a) {
      return 1;
    }
    if (!b) {
      return -1;
    }
    if (a.toUpperCase() < b.toUpperCase()) {
      return -1;
    }
    if (a.toUpperCase() > b.toUpperCase()) {
      return 1;
    }
    return 0;
  }

}
