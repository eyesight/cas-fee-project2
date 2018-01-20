import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'language'
})

export class GenderLanguage implements PipeTransform {

  constructor() {}

  public transform( value: string, language: string = 'de'): string {
    let displayValue = '';
    if (!value) {
      return;
    }
    value = value.toLowerCase();
    switch (language) {
      case 'de':
      switch (value) {
        case 'de':
          displayValue = 'Deutsch';
          break;
        case 'fr':
          displayValue = 'Französisch';
          break;
        case 'en':
          displayValue = 'Englisch';
          break;
        default:
          displayValue = 'Deutsch';
      }
      break;
      case 'en':
        switch (value) {
          case 'de':
            displayValue = 'German';
            break;
          case 'fr':
            displayValue = 'French';
            break;
          case 'en':
            displayValue = 'English';
            break;
          default:
            displayValue = 'English';
        }
        break;
      case 'fr':
        switch (value) {
          case 'de':
            displayValue = 'Allemand';
            break;
          case 'fr':
            displayValue = 'Français';
            break;
          case 'en':
            displayValue = 'Anglais';
            break;
          default:
            displayValue = 'Français';
        }
        break;
      default:
        switch (value) {
          case 'de':
            displayValue = 'Deutsch';
            break;
          case 'fr':
            displayValue = 'Französisch';
            break;
          case 'en':
            displayValue = 'Englisch';
            break;
          default:
            displayValue = 'Deutsch';
        }
        break;
    }
    return displayValue;
  }
}
