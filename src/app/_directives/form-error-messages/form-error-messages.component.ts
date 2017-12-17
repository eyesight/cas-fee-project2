import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-error-messages',
  templateUrl: './form-error-messages.component.html'
})
export class FormErrorMessagesComponent {

  private static readonly errorMessages = {
    'required': () => 'Dieses Feld darf nicht leer gelassen werden',
    'minlength': (params) => 'Bitte geben Sie mindestens ' + params.requiredLength + ' Zeichen ein.',
    'maxlength': (params) => 'Bitte geben Sie maximal ' + params.requiredLength + ' Zeichen ein.',
    'pattern': (params) => 'Die Eingabe entspricht nicht den Vorgaben',
    'email': (params) => 'Bitte geben Sie eine gültige E-Mailadresse ein',
    'matchIt': (params) => 'Sie stimmen nicht überein.',
    'telephoneNumber': (params) => 'Bitte geben Sie eine gültige Telefonnummer ein (XXX XXX XX XX)',
    'numberCheck': (params) => 'Bitte nur Zahlen eingeben',
    'dateFormatCheck': (params) => 'Bitte ein gültiges Datum eingeben (tt.mm.yyyy)',
    'passwordCheck': (params) => 'Das Passwort muss mindestens einen Buchstaben, eine Zahl und ein Sonderzeichen enthalten.'
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return FormErrorMessagesComponent.errorMessages[type](params);
  }

}
