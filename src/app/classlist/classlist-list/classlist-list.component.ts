import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User, UserAuth} from '../../_models/user.model';
import {ActivatedRoute} from "@angular/router";
import {UserAuthService} from "../../_services/user-auth.service";
import {UserContentService} from "../../_services/user-content.service";
import {ClasslistService} from "../service/classlist.service";
//import {Sort} from "../classlist.const";


enum SORT {
  UP = 1,
  DOWN = 2,
  NEUTRAL = 0
}
enum FIELDS {
  C_FORENAME = 0,
  C_SURNAME,
  P_FORENAME,
  P_SURNAME,

  PLACE
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

  public sort: SORT[] = [0, 0, 0, 0, 0, 0];
  private  sor = this.sfPF;


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

  public onSort(id: number) {

    if (this.sort[id]) {
      if (this.sort[id] === SORT.UP) {
        this.sort[id] = SORT.DOWN;
      } else {
        this.sort[id] = SORT.UP;
      }
    } else {
      this.sort[id] = SORT.UP;
    }
    console.log('id of sort:'+ id);
      switch (id) {
        case FIELDS.P_FORENAME:
          this.sor = this.sfPF;
          break;
        case FIELDS.P_SURNAME:
          this.sor = this.sfPS;
          break;
        case FIELDS.C_FORENAME:
          this.sor = this.sfCF;
          break;
        case FIELDS.C_SURNAME:
          this.sor = this.sfCS;
          break;
        case FIELDS.PLACE:
          this.sor = this.sfPL;
          break;
        default:
   //  this.sortList(sor);
     break;

     }
    console.log('id of sort:'+ id + ' sorter:'+ this.sor);

    if (this.sort[id] === SORT.UP) {
       this.classlistList = this.classlistList.sort((a, b) => this.sor(a, b));
     } else if
      (this.sort[id] === SORT.DOWN) {
       this.classlistList = this.classlistList.sort((a, b) => this.sor(b, a));
     }

  }

  private sfPF(a: User, b: User){
    return this.sortFunc(a.parent_forename, b.parent_forename);
  }
  private sfPS(a: User, b: User){
    return this.sortFunc(a.parent_surname, b.parent_surname);
  }
  private sfCF(a: User, b: User){
    return this.sortFunc(a.child_forename, b.child_forename);
  }
  private sfCS(a: User, b: User){
    return this.sortFunc(a.child_surname, b.child_surname);
  }
  private sfPL(a: User, b: User){
    return this.sortFunc(a.place, b.place);
  }
  private sortFunc(a: string, b: string) {
    if (a.toUpperCase() < b.toUpperCase()) {
      return -1;
    }
    if (a.toUpperCase() > b.toUpperCase()) {
      return 1;
    }
    return 0;
  }

}
