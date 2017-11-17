/**
 * Created by awedag on 17.11.17.
 */
import { NgModule } from '@angular/core';

import {AppTextareaAutosizeDirective} from './textarea-autosize.directive';

@NgModule({
  declarations: [
    AppTextareaAutosizeDirective
  ],
  exports: [
    AppTextareaAutosizeDirective
  ]
})
export class DirectivesModule{}
