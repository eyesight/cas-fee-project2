import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AlertService {
  public subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router) {
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

  public success(message: string, keepAfterNavigationChange = false, timeout = 0) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
    if (timeout > 0) {
      // clear message
      setTimeout(() => this.subject.next({ type: 'success', text: message }), timeout);
    }
  }

  error(message: string, keepAfterNavigationChange = false, timeout = 0) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
    if (timeout > 0) {
      // clear message
      setTimeout(() => this.subject.next({ type: 'error', text: message }), timeout);
    }
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
