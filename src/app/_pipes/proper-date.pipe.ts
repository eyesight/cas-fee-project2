import { Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'properDate'
})
export class ProperDatePipe implements PipeTransform {

  constructor() {}

  public transform( date: string): string {
    // return time as 14:53
    const ts = moment(date);
    if (date) {
      return ts.locale('de-ch').format('LL');
    } else {
      return 'Pendent';
    }
   // return moment(date).locale().format('LTS');
  }
}
