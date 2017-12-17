import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertService } from '../../_services/index';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, AfterViewChecked {
  hidden: boolean = true;
  message: any;

  constructor(private alertService: AlertService) { }
  @ViewChild('scrollTop') private el: ElementRef;


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

  ngAfterViewChecked() {
    if (this.el) {
      window.scrollTo(0, 0);
    }
  }
}

