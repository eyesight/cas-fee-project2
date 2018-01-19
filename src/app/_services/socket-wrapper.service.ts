
import {Injectable} from '@angular/core';
import {AppConfigClass} from '../_helpers/app.config';
import {UserAuthService} from './user-auth.service';

import * as io from 'socket.io-client';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

const socketError = 'error';
const socketConnect = 'connect';
const socketDisconnect = 'disconnect';
const channelReceiveMessage = 'broadcastToAll_chatMessage';
const channelSendMessage = 'chatMessageToSocketServer';

@Injectable()
export class SocketWrapper {

  private socket: io;
  private connectionState = true;
  private channelReceive = null;
  private channelSend = null;
  private socketConnectionState = new BehaviorSubject<boolean>(false);
  private socketConnListener: Subscription;

  constructor(private appConf: AppConfigClass, private userAuthService: UserAuthService) {
  }

  public setup(chnReceive: string = channelReceiveMessage, chnSend: string = channelSendMessage) {
    this.channelReceive = chnReceive;
    this.channelSend = chnSend;
    console.log('SocketWrapper. setup: socket token:' + this.userAuthService.getCurrentUserJwt());
    this.socket = io(this.appConf.getConfig().apiUrl, {
      upgrade: true,
      query: 'token=' + this.userAuthService.getCurrentUserJwt()
    });
    this.socketConnListener = this.onConnection()
      .subscribe(state => {
        //  console.log('connection:'  + state);
        if (this.connectionState !== state && state) {
          // reset buffer on once we connection back
          // console.dir(this.socket);
          // this helps obviously that on emit the call always returns, after connection gets established again
          this.socket.sendBuffer = [];
        }
        this.connectionState = state;
      });
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

    if (this.connectionState) {
      return this.socket.emit(this.channelSend, msg, callback);
    } else {
      throw new Error('no connection : message isnt send - socket.io has a problem that is sometimes ' +
        ' looses messages once getting online again -> so thats why we dont even retry to send - cant take this responsibility');
    }


  }

  public sendPro<T>(msg): Promise<T> {

    return new Promise((resolve, reject) => {
      try {
        this.send(msg, (resp, name) => {
          console.log('swrp.send:' + resp);
          if (resp !== 200) {
            console.log('socket-wrapper: sendPro: on socket.emit error:' + resp);
            reject(resp);
          } else {
            resolve(name);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  public close() {
    this.socket.disconnect();
  }
}


