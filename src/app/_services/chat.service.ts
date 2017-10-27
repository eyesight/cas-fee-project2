/**
 * Created by awedag on 17.10.17.
 */


import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
// need to import explicitly the map function of Rx!
import 'rxjs/Rx';

import { MessageItem, Message } from '../_models/message.model';

@Injectable()
export class ChatService {

  public message: Message[];
  public socket: any;
  public userName: string;
  public mm: string;

  constructor(private http: Http) {
    this.userName = 'testuser';
    this.socket = io('localhost:3100', { upgrade: true, query: 'userName=' + 'testuser' });

  }

  public load(): Observable<Message[]> {
    console.log('load OBservable message');
    return  this.http
      .get('/assets/mock/messageItem.json')
      .map((result ) => result.json());

  }


  public sendMessage(msg: string){
    let reference = this;
    console.log('send message :' + msg);
    this.socket.emit('chatMessageToSocketServer', msg, function(respMsg, username){
      reference.mm = respMsg;
      reference.userName = username;
    });

  }


}




