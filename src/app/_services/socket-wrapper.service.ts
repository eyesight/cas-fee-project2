/**
 * Created by awedag on 21.11.17.
 */
import { Injectable } from '@angular/core';
import { AppConfigClass } from '../_helpers/app.config';
import {UserAuthService} from './user-auth.service';

import * as io from 'socket.io-client';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

const socketError = 'error';
const socketConnect = 'connect';
const socketDisconnect = 'disconnect';
const channelReceiveMessage = 'broadcastToAll_chatMessage';
const channelSendMessage = 'chatMessageToSocketServer';

@Injectable()
export class SocketWrapper {

  private socket: io;
  private channelReceive = null;
  private channelSend = null;
  private socketConnectionState = new BehaviorSubject<boolean>(false);

  constructor( private appConf: AppConfigClass, private userAuthService: UserAuthService) {
  }

  public setup(chnReceive: string = channelReceiveMessage, chnSend: string = channelSendMessage ) {
    this.channelReceive = chnReceive;
    this.channelSend = chnSend;
    this.socket = io(this.appConf.getConfig().apiUrl, { upgrade: true, query: 'token=' + this.userAuthService.getCurrentUserJwt()});

  }

  public onConnection(): Observable<boolean> {
    if (this.socket) {
      this.socket.on(socketConnect, () => this.socketConnectionState.next(true));
      this.socket.on(socketDisconnect, () => this.socketConnectionState.next(false));
      return this.socketConnectionState.asObservable();

    } else {
      return null;
    }

  }
  public onError(callback) {
    if (this.socket) {
      return this.socket.on(socketError, callback);
    } else {
      return null;
    }
  }
  public listen(callback) {
    if (!this.channelReceive) {
      return;
    }
    return this.socket.on(this.channelReceive, callback);
  }
  public send(msg, callback) {
    if (!this.channelSend) {
      return;
    }
    return this.socket.emit(this.channelSend, msg, callback);

  }

  public sendPro<T>(msg): Promise<T> {

    console.log('sendPro');
    return new Promise((resolve, reject) => {

      try {
        this.send(msg, (resp, name) => {
          console.log('swrp.send:' + resp);
          if (resp !== 200) {
            console.log('on socket.emit error:' + resp);
            reject('error');
          }else {
            resolve(name);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public close() {
    this.socket.disconnet();
  }
}


