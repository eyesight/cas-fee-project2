import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matcher(name1: string, name2: string): ValidatorFn{
  return (control: AbstractControl): {[key: string]: boolean} => {
    const first = control.get(name1);
    const confirm = control.get(name2);
    if (!first || !confirm) {
      return null;
    }
    return first.value === confirm.value ? null : { nomatch: true };
  };
}
