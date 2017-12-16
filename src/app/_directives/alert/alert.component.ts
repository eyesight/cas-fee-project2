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
    this.alertService.getMessage().subscribe(message => { this.message = message; });
    console.log('got it');

  }

  ngAfterViewChecked() {
    if (this.el) {
     // couldn't find another way then to user window.scrollTo;
      window.scrollTo(0, 0);
    }
  }

}

