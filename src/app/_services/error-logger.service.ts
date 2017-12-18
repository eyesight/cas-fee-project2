import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorLoggerService {

  constructor(private alertService: AlertService) {
  }

  public log(message: string): void {
    console.log('message'+ message);
      this.alertService.error(message);
  }
}
