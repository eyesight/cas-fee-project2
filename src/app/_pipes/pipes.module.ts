import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FromNowPipe } from './from-now.pipe';
import { ProperTimePipe } from './proper-time.pipe';
import { ProperDatePipe } from './proper-date.pipe';
import { genderPipe } from './gender.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FromNowPipe,
    ProperTimePipe,
    ProperDatePipe,
    genderPipe
  ],
  exports: [
    FromNowPipe,
    ProperTimePipe,
    ProperDatePipe,
    genderPipe
  ],
  providers: [
  ]
})
export class PipesModule {}
