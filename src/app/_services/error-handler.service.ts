import { Injectable, ErrorHandler } from '@angular/core';
import { ErrorLoggerService } from './error-logger.service';

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

  constructor(private logger: ErrorLoggerService) {
    super(false);
  }

  public handleError(exception: any) {
    if (exception.message && exception.message.length > 0) {
      this.logger.log(exception.message);
    } else {
      this.logger.log('Something went wrong. Please contact your helpdesk');
    }
    super.handleError(exception);
  }
}
