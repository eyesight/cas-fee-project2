import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileAvatarComponent } from './profile-avatar/profile-avatar.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { ProfileOverlayComponent } from './profile-overlay/profile-overlay.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileAvatarComponent, ProfileFormComponent, ProfileOverlayComponent, ProfileDetailsComponent]
})
export class ProfileModule { }
