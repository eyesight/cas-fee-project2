import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../_services/index';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, AfterViewChecked {
  message: any;

  constructor(private alertService: AlertService) { }
  @ViewChild('scrollTop') private el: ElementRef;


  ngOnInit() {
    console.log('sdfsdfsfsdfds');
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
      console.dir(this.message);
    });
  }

  ngAfterViewChecked() {
    if (this.el) {
      window.scrollTo(0, 0);
    }
  }
}

