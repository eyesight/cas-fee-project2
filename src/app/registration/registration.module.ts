import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegistrationComponent } from './registration.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { RegistrationRoutesModule } from './registration.routes';

import { DirectivesModule } from '../_directives/directives.module';
import { NgDatepickerModule } from 'ng2-datepicker';

import { AlertService } from '../_services/index';

import { PipesModule } from '../_pipes/pipes.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutesModule,
    DirectivesModule,
    NgDatepickerModule,
    PipesModule
  ],
  declarations: [
    RegistrationComponent,
    TermsOfUseComponent
  ],
  providers: [
    AlertService
  ]
})
export class RegistrationModule { }
