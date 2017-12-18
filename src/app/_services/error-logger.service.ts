import { Injectable } from '@angular/core';

@Injectable()
export class ErrorLoggerService {

  constructor() {
  }

  public log(message: string): void {
    console.log(message);
  }
}
