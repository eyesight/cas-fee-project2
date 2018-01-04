import { Injectable } from '@angular/core';

export const appConfig = {
   apiUrl: 'http://localhost:3020'
//apiUrl: 'http://192.168.1.114:3020'
};

@Injectable()
export class AppConfigClass {

  public getConfig() {
    return appConfig;
  }
}

