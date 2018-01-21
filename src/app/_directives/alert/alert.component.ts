import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../_services/index';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  hidden = true;
  message: any;

  private mesSub: Subscription = null;
  constructor(private alertService: AlertService) { }

  public ngOnInit() {
    if (this.mesSub) {
      this.mesSub.unsubscribe();
    }
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

