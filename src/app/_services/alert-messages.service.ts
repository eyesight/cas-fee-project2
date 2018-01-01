import { Injectable } from '@angular/core';

@Injectable()
export class AlertMessagesService {
  constructor() { }

  public  MessagesSuccess = {
  register: 'Registrierung war erfolgreich',
    reconnected: 'Verbindung wieder hergestellt',
    disconnected: 'Verbindung unterbrochen',
    imageSaved: 'Das Bild wurde erfolgreich gespeichert',
    dataChange: 'Daten wurden erfolgreich geändert'
};

  public MessagesError = {
    register: 'Da ist etwas schief gelaufen. Bitte prüfen Sie ihre Angaben nochmals und versuchen Sie es erneu',
    register901: 'Diese Email wurde bereits vergeben',
    avatarNotLoaded: 'Die Profilbilder können nicht geladen werden',
    newlogin: 'Bitte melden Sie sich neu an',
    error: 'Fehler ',
    tryAgain: 'Ein Problem ist aufgetreten, bitte versuchen Sie es nochmals',
    imageSize: 'Das Bild ist zu gross. Es darf nicht grösser als 300 KB sein.',
    dateType: 'Tut uns leid. Dieses Dateiformat wird zurzeit nicht unterstützt.',
    password: 'Das alte Passwort stimmt leider nicht oder das neue Passwort entspricht nicht den Richtlinien'
};
}


