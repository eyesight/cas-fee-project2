import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAvatarComponent } from './profile-avatar/profile-avatar.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileAvatarComponent, ProfileFormComponent]
})
export class ProfileModule { }
