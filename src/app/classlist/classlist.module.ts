import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasslistItemComponent } from './classlist-item/classlist-item.component';
import { ClasslistListComponent } from './classlist-list/classlist-list.component';
import { ClasslistComponent } from './classlist.component';
import { ClasslistRoutesModule } from './classlist.routes';

@NgModule({
  imports: [
    CommonModule, ClasslistRoutesModule
  ],
  declarations: [ClasslistItemComponent, ClasslistListComponent, ClasslistComponent]
})
export class ClasslistModule { }
