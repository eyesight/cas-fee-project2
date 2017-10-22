/**
 * Created by awedag on 17.10.17.
 */


import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// need to import explicitly the map function of Rx!
import 'rxjs/Rx';

import { MessageItem, Message } from '../model/messageItem.model';

@Injectable()
export class MessageItemService {

  public mesksage: Message[];

  constructor(private http: Http) {

  }

  public load(): Observable<Message[]> {
    console.log('load OBservable message');
    return  this.http
      .get('/assets/mock/messageItem.json')
      .map((result ) => result.json());

   // console.log(x[0].text);
   /* const any: Message[] = [
      {
        "userName": "Ursli", "klasseName": "3Ab", "text": "Lorem", "createdAt": "2017-10-05T08:15:30-00:00"
      },
      {
        "userName": "Hansli", "klasseName": "3Ab", "text": "Psim", "createdAt": "2017-05-05T08:16:30-00:00"
      },
      {
        "userName": "Seppli", "klasseName": "3Ab", "text": "Psasdfl kajhsdfkl ajshdfaim", "createdAt": "2017-10-05T08:16:30-00:00"
      },
      {
        "userName": "Sandra", "klasseName": "3Ab", "text": "Psim", "createdAt": "2016-11-07T08:16:30-00:00"
      },
      {
        "userName": "Steffi", "klasseName": "3Ab", "text": "Psim", "createdAt": "2016-11-07T08:16:30-00:00"
      }

    ];


   // return Observable.of(any).map(o => JSON.parse(o));

      return  Observable.create((observer) => {observer.next(any); });
     // return obs.subscribe((data) => console.log(x));
     //any.map(x => x.json());
   // return x;

*/
  }


}





