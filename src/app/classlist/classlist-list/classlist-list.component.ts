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
  P_FORENAME = 0,
  P_SURNAME,
  C_FORENAME,
  C_SURNAME,
  C_PLACE_
}

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

  /*  switch (id) {
      case FIELDS.P_FORENAME:
      default:
            this.sortList();

    }*/
    this.sortList();
  }
  private sortList() {
    this.classlistList = this.classlistList.sort((a, b) =>  {
      if (a.email < b.email){
        return -1;}
      if (a.email > b.email){
        return 1;}
      return 0;
    //  return ( (a.child_forename > b.child_forename) ? 1 : ((b.child_forename > a.child_forename) ? -1 : 0));
    // return -1;
  });
    console.dir(this.classlistList);
    //this.internalcll =  [this.internalcll[4], this.internalcll[3]];
  }

}
