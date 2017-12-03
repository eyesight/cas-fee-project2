import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User, UserAuth} from '../../_models/user.model';
import {ActivatedRoute} from "@angular/router";
import {UserAuthService} from "../../_services/user-auth.service";
import {UserContentService} from "../../_services/user-content.service";
import {ClasslistService} from "../service/classlist.service";

@Component({
  selector: 'app-classlist-list',
  templateUrl: './classlist-list.component.html'
})
export class ClasslistListComponent implements OnInit {

  @Input()
  classlistList: User[] = null;

  @Input()
  userCurrent: User = null;



  constructor(private classlistService: ClasslistService) {
  }

  ngOnInit() {
  }

  public onChecked(item: User, checked: any) {
    console.log('classlist-list onchecked:' + checked.target.checked);
    console.dir(checked);
   // this.approved.emit(checked.target.checked);

      this.classlistService.approveUser(item, (checked.target.checked === true ? 1 : 0))
       .subscribe((x) => {console.log('approved'); } );
      //  item.lastModified = new Date();
      //  this.snackBar.open('checked / unchecked item', null, { duration: 1500 });

  }

}
