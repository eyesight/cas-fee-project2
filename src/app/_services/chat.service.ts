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
  private url = 'localhost:3020';

  // see https://www.dev6.com/Angular2-WebSockets
  // TODO: handle dis/reconnect
  // TODO: read initial complete messagethread

  constructor(private http: Http) {
    this.userName = 'testuser';
    this.socket = io(this.url, { upgrade: true, query: 'userName=' + 'testuser' });

  }

  public load(): Observable<Message[]> {
    console.log('load OBservable message');
    return  this.http
      .get('/assets/mock/messageItem.json')
      .map((result ) => result.json());

    //this.socket.on('chatMessageFromSocketServer',)

  }
  public readMessages(): Observable<any> {

    const observable = new Observable(observer => {
      this.socket.on('broadcastToAll_chatMessage', (data) => {
        console.log('broadcastToAll_chatMessage: msg received' + data.text);
        console.dir(data);
        observer.next(data);
      });
      // observable is disposed
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;




    /*
    *  return new Observable(observer => {

     this.socket.on(event, data => {
     console.log('incoming for', event, data);
     if (data.frq === this.frq) {
     observer.next(data);
     }
     });

     // observable is disposed
     return () => {
     this.socket.off(event);
     }

     });*/

  }


  public sendMessage(msg: string){
    const reference = this;
    console.log('send message :' + msg);
    this.socket.emit('chatMessageToSocketServer', msg, function(respMsg, username){
      reference.mm = respMsg;
      reference.userName = username;
    });

  }


}




