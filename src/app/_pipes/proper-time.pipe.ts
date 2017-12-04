import { Pipe, PipeTransform} from "@angular/core";
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
      return ts.locale('de-ch').format('LTS');
    } else {
      return 'Pendent';
    }
   // return moment(date).locale().format('LTS');


  }

}
