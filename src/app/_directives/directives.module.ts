/**
 * Created by awedag on 17.11.17.
 */
import { NgModule } from '@angular/core';

import {AppTextareaAutosizeDirective} from './textarea-autosize.directive';
import {AppScrollBottomDirective} from './scroll-bottom.directive';

@NgModule({
  declarations: [
    AppTextareaAutosizeDirective,
    AppScrollBottomDirective
  ],
  exports: [
    AppTextareaAutosizeDirective,
    AppScrollBottomDirective
  ]
})
export class DirectivesModule {}
