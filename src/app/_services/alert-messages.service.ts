import { Injectable } from '@angular/core';

@Injectable()
export class AlertMessagesService {

  private static readonly alertMessagesSuccess = {
    'register': 'Registrierung war erfolgreich'
  };

  private static readonly alertMessagesError = {
    'register901': 'Diese Email wurde bereits vergeben',
    'register': 'Da ist etwas schief gelaufen. Bitte prüfen Sie ihre Angaben nochmals und versuchen Sie es erneu'
  };

  constructor() { }

  public getAlertMessageSuccess(type: string) {
    return AlertMessagesService.alertMessagesSuccess[type];
  }

  public getAlertMessageError(type: string) {
    return AlertMessagesService.alertMessagesError[type];
  }
}
