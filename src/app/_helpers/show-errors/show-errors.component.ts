import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-errors',
  templateUrl: './show-errors.component.html'
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'Dieses Feld darf nicht leer gelassen werden',
    'minlength': (params) => 'Bitte geben Sie mindestens ' + params.requiredLength + ' Zeichen ein.',
    'maxlength': (params) => 'Bitte geben Sie maximal ' + params.requiredLength + ' Zeichen ein.',
    'pattern': (params) => 'Bitte halten Sie folgende Vorgaben ein: ' + params.requiredPattern,
    'email': (params) => 'Bitte geben Sie eine gültige E-Mailadresse ein'
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
    return ShowErrorsComponent.errorMessages[type](params);
  }

}
