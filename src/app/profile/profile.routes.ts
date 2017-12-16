import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileDetailsChildComponent } from './profile-details-child/profile-details-child.component';
import { ProfileDetailsParentComponent } from './profile-details-parent/profile-details-parent.component';
import { ProfilePasswordChangeComponent } from './profile-password-change/profile-password-change.component';
import { ProfileEmailChangeComponent } from './profile-email-change/profile-email-change.component';

const ProfileRoutes = [
  {
    path: '', component: ProfileComponent,
    children: [
      { path: 'profile-details-child', component: ProfileDetailsChildComponent },
      { path: 'profile-details-parent', component: ProfileDetailsParentComponent },
      { path: 'profile-pwd', component: ProfilePasswordChangeComponent },
      { path: 'profile-email', component: ProfileEmailChangeComponent }
      ]
  },
];

export const ProfileRoutesModule = RouterModule.forChild(ProfileRoutes);
