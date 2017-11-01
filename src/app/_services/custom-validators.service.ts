import { FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

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
}
