/**
 * Created by awedag on 19.10.17.
 */

import { Pipe, PipeTransform} from "@angular/core";
import * as moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
   transform( date: Date): string {
     moment.locale('de');
     console.log(Date.now() - 25);
     const now = new Date(Date.now() - 25);
     if (date.getUTCMilliseconds() >=  (now).getUTCMilliseconds() )
     {
       return moment(date).fromNow();
     }
     else
     {
       return moment(date).fromNow();
     }
  }
}
