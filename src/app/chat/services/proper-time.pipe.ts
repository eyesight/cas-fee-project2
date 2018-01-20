import { Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'properTime'
})
export class ProperTimePipe implements PipeTransform {

  constructor() {}

  transform( date: string): string {
    // return time as 14:53
    const ts = moment.utc(date);
    if (date) {
      return 'zugestellt um: ' + ts.local().format('LTS');
    } else {
      return 'Pendent';
    }
    // return moment(date).locale().format('LTS');
  }
}
