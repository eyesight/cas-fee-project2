import { FormControl, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {

  static matcher(name1: string, name2: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      const first = control.get(name1);
      const confirm = control.get(name2);

      if (!first || !confirm) {
        return null;
      }
      return first.value === confirm.value ? null : {nomatch: true};
    };
  }

  static telephoneNumber(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^(\+?)\d{0,2}?\s?\d{2,3}\s?\d{3,3}\s?\d{2,2}\s?\d{2,2}$/.test(c.value);
    const message = {
      'telephoneNumber': {
        'message': ''
      }
    };
    return isValidPhoneNumber ? null : message;
  }

  static justNumbers(c: FormControl): ValidationErrors {
    const isValid = /^\d{1,}$/.test(c.value);
    const message = {
      'numberCheck': {
        'message': ''
      }
    };
    return isValid ? null : message;
  }

  static dateFormat(c: FormControl): ValidationErrors {
    const isValid = /^\d{1,2}.\d{1,2}.\d{4,4}$/.test(c.value);
    const message = {
      'dateFormatCheck': {
        'message': ''
      }
    };
    return isValid ? null : message;
  }

  static passwordCheck(c: FormControl): ValidationErrors {
    const isValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&_\-])[A-Za-z\d$@$!%*#?&_\-]{7,}$/.test(c.value);
    const message = {
      'passwordCheck': {
        'message': ''
      }
    };
    return isValid ? null : message;
  }
}
