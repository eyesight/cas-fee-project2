import {Injectable} from '@angular/core';

@Injectable()
export class AlertMessagesService {
  constructor() {
  }

  public MessagesSuccess = {
    register: 'Registrierung war erfolgreich',
    reconnected: 'Verbindung wieder hergestellt',
    disconnected: 'Verbindung unterbrochen',
    imageSaved: 'Das Bild wurde erfolgreich gespeichert',
    dataChange: 'Daten wurden erfolgreich geändert'
  };

  public MessagesError = {
    register: 'Da ist etwas schief gelaufen. Bitte prüfen Sie ihre Angaben nochmals und versuchen Sie es erneut',
    register901: 'Diese Email wurde bereits vergeben',
    avatarNotLoaded: 'Die Profilbilder können nicht geladen werden',
    newlogin: 'Bitte melden Sie sich neu an',
    error: 'Ein Problem ist aufgetreten, bitte versuchen Sie es nochmals oder melden sich beim Support',
    errorImageSize: 'Ein Problem ist aufgetreten, Bild konnte nicht gespeichert werden',
    imageSize: 'Das Bild ist zu gross. Es darf nicht grösser als 190 KB sein.',
    dateType: 'Tut uns leid. Dieses Dateiformat wird zurzeit nicht unterstützt.',
    password: 'Das alte Passwort ist nicht korrekt oder das neue Passwort entspricht nicht den Richtlinien',
    authorization: 'Sie haben keine Berechtigung für diesen Menupunkt. Ihre Bestätigung ist noch ausstehend',
    login401: 'Der Benutzer ist nicht registriert oder das Passwort ist falsch',
    deleteUser400: 'Dieser User war bereits bestätigt und hat informationen geteilt. Bitte lassen Sie ihn vom Administrator entfernen',
    chatMaxLength: 'Ihr Text darf die Limite von 5000 Zeichen nicht überschreiben.'

  };
}


