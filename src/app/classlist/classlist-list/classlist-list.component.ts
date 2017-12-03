import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User, UserAuth} from '../../_models/user.model';
import {ActivatedRoute} from "@angular/router";
import {UserAuthService} from "../../_services/user-auth.service";
import {UserContentService} from "../../_services/user-content.service";

@Component({
  selector: 'app-classlist-list',
  templateUrl: './classlist-list.component.html'
})
export class ClasslistListComponent implements OnInit {

  @Input()
  classlistList: User[] = null;

  @Input()
  userCurrent: User = null;

  @Output()
  public approved: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(private userContentService: UserContentService) {
  }

  ngOnInit() {
  }

  public onChecked(checked: boolean){
    this.approved.emit(checked);
  }

}
