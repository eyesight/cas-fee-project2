import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AlertMessagesService } from './alert-messages.service';

@Injectable()
export class AlertService {
  public subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  private filtertMessage: any = {};
  private keysOfSuccess = Object.keys(this.alertMessagesService.MessagesSuccess);
  private keysOfError = Object.keys(this.alertMessagesService.MessagesError);

  constructor(private router: Router,
              private alertMessagesService: AlertMessagesService) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  public success(message: any, keepAfterNavigationChange = false, timeout = 0) {
    // check if message is a key of alertMessagesService.MessagesSuccess
    this.filtertMessage = this.keysOfSuccess.filter((key) => {
      return key === message;
    }).map((x) => {
      return this.alertMessagesService.MessagesSuccess[x];
    });
    // if message is a key of array, return the value from alertMessagesService
    message = (this.filtertMessage !== 'undefined' && this.filtertMessage !== null && this.filtertMessage.length !== 0) ? this.filtertMessage : message;

    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
    if (timeout > 0) {
      // clear message
      setTimeout(() => this.subject.next({ type: 'success', text: message }), timeout);
    }
  }

  public error(message: string, keepAfterNavigationChange = false, timeout = 0) {
    // check if message is a key of alertMessagesService.MessagesSuccess
    this.filtertMessage = this.keysOfError.filter((key) => {
      return key === message;
    }).map((x) => {
      return this.alertMessagesService.MessagesError[x];
    });
    // if message is a key of array, return the value from alertMessagesService
    if (this.filtertMessage !== 'undefined' && this.filtertMessage !== null && this.filtertMessage.length !== 0)
    {
      message = this.filtertMessage ;
    }  else {
      message = this.alertMessagesService.resolveRegexErrors(message);
    }
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
    if (timeout > 0) {
      // clear message
      setTimeout(() => this.subject.next({ type: 'error', text: message }), timeout);
    }
  }

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
