import { Component, OnInit } from '@angular/core';
import { AlertService, AlertMessagesService } from '../../_services/index';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  hidden: boolean = true;
  message: any;

  constructor(private alertService: AlertService) { }


  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      this.hidden = false;
      setTimeout(() => {
        this.hidden = true;
      }, 7000);
      setTimeout(() => {
        this.message = '';
      }, 8000);
    });
  }
}

