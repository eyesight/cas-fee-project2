/**
 * Created by awedag on 17.10.17.
 */


import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// need to import explicitly the map function of Rx!
import 'rxjs/Rx';

import { MessageItem, Message } from '../_models/message.model';

@Injectable()
export class ChatService {

  public mesksage: Message[];

  constructor(private http: Http) {

  }

  public load(): Observable<Message[]> {
    console.log('load OBservable message');
    return  this.http
      .get('/assets/mock/messageItem.json')
      .map((result ) => result.json());

  }


}





