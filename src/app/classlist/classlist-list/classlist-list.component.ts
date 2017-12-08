import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User, UserAuth} from '../../_models/user.model';
import {ActivatedRoute} from "@angular/router";
import {UserAuthService} from "../../_services/user-auth.service";
import {UserContentService} from "../../_services/user-content.service";
import {ClasslistService} from "../service/classlist.service";


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

export class ClasslistListComponent implements OnInit {

  @Input()
  classlistList: User[] = null;

  @Input()
  userCurrent: User = null;

//  public sort: SORT[] = [0, 0, 0, 0, 0, 0];
  private sor = this.sfPF;

  public SortFields = FIELDS;


  public sortGoals: SortClass[] = [
    {up: false, down: false, sortFn: this.sfCF},
    {up: false, down: false, sortFn: this.sfCS},
    {up: false, down: false, sortFn: this.sfPF},
    {up: false, down: false, sortFn: this.sfPS},
    {up: false, down: false, sortFn: this.sfPL}
  ];


  constructor(private classlistService: ClasslistService) {
  }

  ngOnInit() {
  }


  public onChecked(item: User, checked: any) {
    console.log('classlist-list onchecked:' + checked.target.checked);
    console.dir(checked);
    // this.approved.emit(checked.target.checked);

    this.classlistService.approveUser(item, (checked.target.checked === true ? 1 : 0))
      .subscribe((x) => {
        console.log('approved');
      });
    //  item.lastModified = new Date();
    //  this.snackBar.open('checked / unchecked item', null, { duration: 1500 });

  }


  public onSortGoal(id: number) {
    this.sor = this.sortGoals[id].sortFn;
    if (this.sortGoals[id].up) {
      this.sortGoals[id].up = false;
      this.sortGoals[id].down = true;
      this.classlistList = this.classlistList.sort((a, b) => this.sor(b, a));
    } else {
      this.sortGoals[id].up = true;
      this.sortGoals[id].down = false;
      this.classlistList = this.classlistList.sort((a, b) => this.sor(a, b));
    }
    // reset other class.zz_..
    this.sortGoals = this.sortGoals.map((x, ix) => {
      if (id !== ix) {
        x.up = false;
        x.down = false;
      }
      return x;
    });


  }


  public sfPF(a: User, b: User) {
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
