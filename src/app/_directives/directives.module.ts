import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTextareaAutosizeDirective } from './textarea-autosize.directive';
import { AppScrollBottomDirective } from './scroll-bottom.directive';
import { AlertComponent } from './alert/alert.component';
import { FormErrorMessagesComponent } from './form-error-messages/form-error-messages.component';


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
    FormErrorMessagesComponent
  ],
  exports: [
    AppTextareaAutosizeDirective,
    AppScrollBottomDirective,
    AlertComponent,
    FormErrorMessagesComponent
  ]
})
export class DirectivesModule {}
