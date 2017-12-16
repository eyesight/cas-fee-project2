import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {CanDeactivate} from '@angular/router';
import {Observer} from 'rxjs/Observer';
import {ClasslistListComponent} from "../classlist-list/classlist-list.component";
import {ClasslistComponent} from "../classlist.component";

@Injectable()
export class CanDeactivateClasslistService implements CanDeactivate<ClasslistComponent> {
  public canDeactivate(component: ClasslistComponent): Observable<boolean> | boolean{
    let resultObserver: Observer<boolean>;
    const resultObs = new Observable<boolean>((observer) => {
      resultObserver = observer;
    });
    if (component) {

     /* resultObserver.next(false);
      resultObserver.complete();

      return resultObs; */
     console.log('can?' + component.canDeactivate);
     return component.canDeactivate;
    }
  }
}

