import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonalDetailsContainerModule } from '../personal-details-container/personal-details-container.module';
import { DirectivesModule } from '../_directives/directives.module';

import { ProfileComponent } from './profile.component';
import { ProfileDetailsChildComponent } from './profile-details-child/profile-details-child.component';
import { ProfileDetailsParentComponent } from './profile-details-parent/profile-details-parent.component';
import { ProfileAvatarComponent } from './profile-avatar/profile-avatar.component';
import { ProfilePasswordChangeComponent } from './profile-password-change/profile-password-change.component';
import { ProfileEmailChangeComponent } from './profile-email-change/profile-email-change.component';
import { NgDatepickerModule } from 'ng2-datepicker';

import { ProfileRoutesModule } from './profile.routes';

import { ImageCompressService, ResizeOptions } from 'ng2-image-compress';

import { FromNowPipe } from '../_pipes/from-now.pipe';
import { ProperTimePipe } from '../_pipes/proper-time.pipe';
import { ProperDatePipe } from '../_pipes/proper-date.pipe';
import { genderPipe } from '../_pipes/gender.pipe';

import { AlertService } from '../_services/index';



@NgModule({
  imports: [
    CommonModule,
    PersonalDetailsContainerModule,
    NgDatepickerModule,
    ProfileRoutesModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  declarations: [
    ProfileComponent,
    ProfileDetailsChildComponent,
    ProfileDetailsParentComponent,
    ProfilePasswordChangeComponent,
    ProfileEmailChangeComponent,
    ProfileAvatarComponent,
    FromNowPipe,
    ProperTimePipe,
    ProperDatePipe,
    genderPipe
  ],
  providers: [
    ImageCompressService,
    ResizeOptions,
    AlertService
  ],
})
export class ProfileModule { }
