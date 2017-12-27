import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FromNowPipe } from './from-now.pipe';
import { ProperTimePipe } from './proper-time.pipe';
import { ProperDatePipe } from './proper-date.pipe';
import { genderPipe } from './gender.pipe';
import { genderLanguage } from './language.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FromNowPipe,
    ProperTimePipe,
    ProperDatePipe,
    genderPipe,
    genderLanguage
  ],
  exports: [
    FromNowPipe,
    ProperTimePipe,
    ProperDatePipe,
    genderPipe,
    genderLanguage
  ],
  providers: [
  ]
})
export class PipesModule {}
