import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FromNowPipe } from './from-now.pipe';
import { ProperDatePipe } from './proper-date.pipe';
import { GenderPipe } from './gender.pipe';
import { GenderLanguage } from './language.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FromNowPipe,
    ProperDatePipe,
    GenderPipe,
    GenderLanguage
  ],
  exports: [
    FromNowPipe,
    ProperDatePipe,
    GenderPipe,
    GenderLanguage
  ],
  providers: [
  ]
})
export class PipesModule {}
