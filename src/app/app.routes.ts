import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guards';
import { RegistrationComponent } from './registration/registration.component';
import { TermsOfUseComponent } from './registration/terms-of-use/terms-of-use.component';
import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileDetailsChildComponent } from './profile/profile-details-child/profile-details-child.component';
import { ProfileDetailsParentComponent } from './profile/profile-details-parent/profile-details-parent.component';


export const ROUTES: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'Home' }, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: { title: 'Logout' }},
  { path: 'registration', component: RegistrationComponent, data: { title: 'Registration' },
    children: [{ path: 'terms-of-use', component: TermsOfUseComponent }]},
  { path: 'profile', component: ProfileComponent, data: { title: 'Profil' },
    children: [{ path: 'profile-details-child', component: ProfileDetailsChildComponent }, { path: 'profile-details-parent', component: ProfileDetailsParentComponent }], canActivate: [AuthGuard]},
  { path: 'classlist', loadChildren: './classlist/classlist.module#ClasslistModule', data: {title: 'Klassenliste'}, canActivate: [AuthGuard]},
  { path: 'chat', loadChildren: './chat/chat.module#ChatModule', data: {title: 'Chat'}, canActivate: [AuthGuard] },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }

];

