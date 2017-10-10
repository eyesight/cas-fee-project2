import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasslistItemComponent } from './classlist-item/classlist-item.component';
import { ClasslistListComponent } from './classlist-list/classlist-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ClasslistItemComponent, ClasslistListComponent]
})
export class ClasslistModule { }
