import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MessageCallback, ChatMessage} from '../_models/message.model';
import {HttpWrapper} from './http-wrapper.service';
import {SocketWrapper} from './socket-wrapper.service';

@Injectable()
export class ChatService {

  // ChatService: establish websocket connections
  constructor(private httpWrp: HttpWrapper, private scktWrp: SocketWrapper) {
  }

  public setup() {
    this.scktWrp.setup();

  }

  // load all message using rest instead of sockets
  // return a promise that also spec is working properly
  public load(): Observable<any> {
    console.log('load Observable message');

    return this.httpWrp.get('/api/chat/getall');
  }

  // iconnectionState: s server available?
  public connectionState(): Observable<boolean> {
    return this.scktWrp.onConnection();
  }

  public authentication(): Observable<any> {
    const observable = new Observable(observer => {
      this.scktWrp.onError(function (error) {

        if (error === 'Not authorized') {
          observer.next(error);

        } else if (error.data) {
          if (error.data.type === 'UnauthorizedError' || error.data.code === 'invalid_token') {
            // redirect user to login page perhaps?
            observer.next('User Token has expired');

          }
        }
        console.log('authetication any error: nothing to notify if error is empty:' + error);
      });
      // observable is disposed
      return () => {
        this.scktWrp.close();
      };
    });
    return observable;
  }

  public readErrors(): Observable<any> {

    const observable = new Observable(observer => {
      this.scktWrp.onError((error) => {
        observer.next(error);
      });
      // remove observable
      return () => {
        this.scktWrp.close();
      };
    });
    return observable;
  }

  public readMessages(): Observable<ChatMessage> {

    const observable = new Observable(observer => {
      this.scktWrp.listen((data) => {
        observer.next(data);
      });
      // remove observable
      return () => {
        this.scktWrp.close();
      };
    });
    return observable;
  }

  public sendMessage(msg: ChatMessage): Promise<MessageCallback> {

    const reference = this;
    console.log('send message :' + msg);

    return this.scktWrp.sendPro<MessageCallback>(msg);
  }

}




