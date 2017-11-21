/**
 * Created by awedag on 21.11.17.
 */
import { Injectable } from '@angular/core';
import { AppConfigClass } from '../_helpers/app.config';
import {UserAuthService} from './user-auth.service';

import * as io from 'socket.io-client';

const socketError = 'error';
const channelReceiveMessage = 'broadcastToAll_chatMessage';
const channelSendMessage = 'chatMessageToSocketServer';

@Injectable()
export class SocketWrapper {

  private socket: io;
  private channelReceive = null;
  private channelSend = null;
  constructor( private appConf: AppConfigClass, private userAuthService: UserAuthService) {
  }

  public setup(chnReceive: string = channelReceiveMessage, chnSend: string = channelSendMessage ) {
    this.channelReceive = chnReceive;
    this.channelSend = chnSend;
    this.socket = io(this.appConf.getConfig().apiUrl, { upgrade: true, query: 'token=' + this.userAuthService.getCurrentUserJwt()});
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

  public sendPro(msg): Promise<any> {

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
  /*public sendP(msg): Promise<any> {
   if (!this.channelSend) {
   return null;
   }
   return new Promise((resolve, reject ) => {
   this.socket.emit(this.channelSend, msg);
   });

   }*/
  public close() {
    this.socket.disconnet();
  }
}


