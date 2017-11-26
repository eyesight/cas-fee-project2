/**
 * Created by awedag on 17.10.17.
 */


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {MessageCallback, MessageJson} from '../_models/message.model';

// need to import explicitly the map function of Rx!
import 'rxjs/Rx';

import {HttpWrapper} from './http-wrapper.service';
import {SocketWrapper} from './socket-wrapper.service';

@Injectable()
export class ChatService {

  // public message: Message[];
  public socket: any;
  public userName: string;
  public mm: string;
  private url = 'localhost:3020';

  // see https://www.dev6.com/Angular2-WebSockets

  constructor(private httpWrp: HttpWrapper, private scktWrp: SocketWrapper ) {
    this.scktWrp.setup();
  }

  // load all message using rest instead of sockets
  // return a promise that also spec is working properly
  public load(): Observable<any> {
    console.log('load Observable message');

         return   this.httpWrp.get('/api/chat/getall');

    /*
      return new Promise((resolve, reject) => {
      try {
      this.httpWrp.get('/api/chat/getall').subscribe((result) => {
        console.log('subscribe of gtall:' + result);
        console.dir(result);
        resolve(result);
      });
      } catch (e) {
        console.log('error:' + e );
        reject(e);
      }
    });
*/
  }

  public connectionState(): Observable<boolean> {
    return this.scktWrp.onConnection();
  }
  public authentication(): Observable<any> {
    const observable = new Observable(observer => {
      this.scktWrp.onError( function (error) {

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
        //observer.next('Authentication ');
        // TODO: decide what error this can be and if we need to throw it against the user
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
      this.scktWrp.onError( (error) => {
        observer.next(error);
      });
      // remove observable
      return () => {
        this.scktWrp.close();
      };
    });
    return observable;
  }

  public readMessages(): Observable<MessageJson> {

    const observable = new Observable(observer => {
      this.scktWrp.listen( (data) => {
        observer.next(data);
      });
      // remove observable
      return () => {
        this.scktWrp.close();
      };
    });
    return observable;
  }


  public sendMessage(msg: MessageJson): Promise<MessageCallback> {

    const reference = this;
    console.log('send message :' + msg);

    return this.scktWrp.sendPro<MessageCallback>(msg);
    }

}




