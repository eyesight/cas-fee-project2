/**
 * Created by awedag on 17.10.17.
 */


import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { MessageJson } from '../_models/message.model';
import { appConfig } from '../_helpers/app.config';
import { Moment } from 'moment';

// need to import explicitly the map function of Rx!
import 'rxjs/Rx';

import { MessageDateBlock, Message } from '../_models/message.model';
import {AuthenticationService} from './authentication.service';
import {UserAuthService} from "./user-auth.service";
import {HttpWrapper} from "./http-wrapper";

const channelReceiveMessage = 'broadcastToAll_chatMessage';
const channelSendMessage = 'chatMessageToSocketServer';

@Injectable()
export class ChatService {

  public message: Message[];
  public socket: any;
  public userName: string;
  public mm: string;
  private url = 'localhost:3020';

  // see https://www.dev6.com/Angular2-WebSockets
  // TODO: handle dis/reconnect
  // TODO: read initial complete messagethread using api/chat/getall

  constructor(private http: Http, private userAuthService: UserAuthService, private httpWrp: HttpWrapper) {
    this.socket = io(this.url, { upgrade: true, query: 'token=' + this.userAuthService.getCurrentUserJwt()});
   // this.socket.emit('klasse', 1);

  }

  // load all message using rest instead of sockets
  //
  public load(): Observable<MessageJson[]> {
    console.log('load Observable message');
    return this.httpWrp.get('/api/chat/getall');

  }
  public authentication(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on("error", function (error) {
        console.dir('error' + error);

        if (error === 'Not authorized'){
          observer.next(error);

        }
        else if (error.data){
          if (error.data.type === 'UnauthorizedError' || error.data.code === 'invalid_token') {
            // redirect user to login page perhaps?
            observer.next('User Token has expired');

          }
        }
        console.log("authetication any error: " + error);
        // TODO: decide what error this can be and if we need to throw it against the user
      });
      // observable is disposed
      return () => {
        this.socket.disconnect();
      };
    })
    return observable;
  }

  public readMessages(): Observable<MessageJson> {

    const observable = new Observable(observer => {
      this.socket.on(channelReceiveMessage, (data) => {
        observer.next(data);
      });
      // remove observable
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


  public sendMessage(msg: MessageJson) {

    const reference = this;
    console.log('send message :' + msg);
    this.socket.emit(channelSendMessage, msg, function(respMsg, username){
      reference.mm = respMsg;
      reference.userName = username;
      console.log('sendmessage callback called:' + respMsg , username);
    });
  }

}




