import { Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment';

@Pipe({
  name: 'gender'
})
export class genderPipe implements PipeTransform {

  constructor() {}

  transform( value: string, language: string, child: boolean): string {
    value = value.toLowerCase();
    if ( value === 'w' || value === 'f' || value === 'frau' || value === 'woman'){
      if ( language === 'de' ) {
        if ( child ) {
          return 'Mädchen';
        }
        return 'Frau';
      } else {
        return 'Miss';
      }
    }else if ( value === 'm' || value === 'h' || value === 'mann' || value === 'man'){
      if ( language === 'de' ) {
        if ( child ) {
          return 'Junge';
        }
        return 'Herr';
      } else {
        return 'Mister';
      }
    } else {
      return 'n.a.';
    }
  }

}
