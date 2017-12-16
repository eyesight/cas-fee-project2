import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalDetailsContainerComponent } from './personal-details-container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PersonalDetailsContainerComponent],
  exports: [PersonalDetailsContainerComponent]
})
export class PersonalDetailsContainerModule { }
