/**
 * Created by awedag on 19.10.17.
 */

import { Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  constructor(){
    moment.locale('de');
    moment.locale('de', {
      calendar: {
        lastDay : '[Gestern]',
        sameDay : '[Heute]',
        nextDay : '[morgen]',
        lastWeek : '[letzte] dddd',
        nextWeek : 'dddd',
        sameElse : 'L'
      }
    });
  }

  transform( date: Date): string {

   //  console.log('date:'+(new Date(date.toDateString())));
     const now = new Date(Date.now() - 25);
    // if ((new Date(date.toDateString())).getUTCMilliseconds() >=  (now).getUTCMilliseconds() )
     {
       return moment((new Date(date.toDateString()))).calendar();
     }
    // else
     {
    //   return moment(date).fromNow();
     }
  }
}
