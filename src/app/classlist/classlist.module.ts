import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ClasslistItemComponent } from './classlist-item/classlist-item.component';
import { ClasslistListComponent } from './classlist-list/classlist-list.component';
import { ClasslistComponent } from './classlist.component';
import { ClasslistRoutesModule } from './classlist.routes';
import { ClasslistService } from './service/classlist.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolverService } from './service/user-resolver.service';
import { MessageBoxComponent } from '../_guards/message-box/message-box.component';
import { CanDeactivateClasslistService } from './service/can-deactivate-classlist.service';
import { PersonalDetailsContainerModule } from '../personal-details-container/personal-details-container.module';



@NgModule({
  imports: [
    CommonModule,
    ClasslistRoutesModule,
    PersonalDetailsContainerModule
  ],
  declarations: [
    ClasslistListComponent,
    ClasslistComponent,
    UserDetailComponent,
    MessageBoxComponent],
  providers: [
    ClasslistService,
    UserResolverService,
    CanDeactivateClasslistService
  ]
})
export class ClasslistModule { }
