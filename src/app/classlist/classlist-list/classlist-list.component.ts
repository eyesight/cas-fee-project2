import {Component, Input, OnInit} from '@angular/core';
import { User } from '../../_models/user.model';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-classlist-list',
  templateUrl: './classlist-list.component.html'
})
export class ClasslistListComponent implements OnInit {

  @Input()
  classlistList: User[] = null;
  constructor() { }

  ngOnInit() {
  }

}
