import { AbstractControl } from '@angular/forms';


export const emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const first = control.get('formEmail');
  const confirm = control.get('confirmEmail');
  if (!first || !confirm) {
    return null;
  }
  return first.value === confirm.value ? null : { nomatch: true };
};

export const passwordMatcher = (control: AbstractControl): {[key: string]: boolean} => {
  const first = control.get('formPassword');
  const confirm = control.get('confirmPassword');
  if (!first || !confirm) {
    return null;
  }
  return first.value === confirm.value ? null : { nomatch: true };
};


