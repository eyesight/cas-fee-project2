import { Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  constructor() {
    moment.locale('de-ch');
    // do correct formattings at sameElse
    moment.updateLocale('de-ch', {
      calendar: {
        lastDay : '[Gestern]',
        sameDay : '[Heute]',
        nextDay : '[morgen]',
        lastWeek : '[letzten] dddd',
        nextWeek : 'dddd',
        sameElse : 'L'
      }
    });
  }

  transform( date: Date): string {
    // toDateString sets time to 00:00:00
   return moment((new Date(date.toDateString()))).calendar();
  }
}
