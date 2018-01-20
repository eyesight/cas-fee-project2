import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class AlertService {
  public subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  private routerEventSub: Subscription = null;

  constructor(private router: Router) {

    if (this.routerEventSub) {
      this.routerEventSub.unsubscribe();
    }
    // clear alert message on route change
    this.routerEventSub = router.events.subscribe(event => {
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

  public error(message: string, keepAfterNavigationChange = false, timeout = 0) {
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
