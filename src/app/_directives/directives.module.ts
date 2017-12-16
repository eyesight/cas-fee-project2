import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppTextareaAutosizeDirective } from './textarea-autosize.directive';
import { AppScrollBottomDirective } from './scroll-bottom.directive';
import { AlertComponent } from './alert/alert.component';
import { ShowErrorsComponent } from './show-errors/show-errors.component';

import { AlertService, AuthenticationService, UserService } from '../_services/index';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppTextareaAutosizeDirective,
    AppScrollBottomDirective,
    AlertComponent,
    ShowErrorsComponent
  ],
  exports: [
    AppTextareaAutosizeDirective,
    AppScrollBottomDirective,
    AlertComponent,
    ShowErrorsComponent
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UserService
  ]
})
export class DirectivesModule {}
