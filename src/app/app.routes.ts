import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_guards/auth.guards';
import {RegistrationAuthGuard} from './_guards/registrationAuth.guards';
import {ForgotPasswordComponent} from './login/forgot-password/forgot-password.component';
import {CanActivateProtectedPagesGuard} from './_guards/can-activate-protected-pages.guard';
import {The404Component} from './the404/the404.component';



export const ROUTES: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, data: {title: 'Home'}, canActivate: [AuthGuard]},
  {
    path: 'login',
    loadChildren: './login/login.module#LoginModule',
    canActivate: [RegistrationAuthGuard]
  },
  {
    path: 'registration',
    loadChildren: './registration/registration.module#RegistrationModule',
    data: {title: 'Registration'},
    canActivate: [RegistrationAuthGuard]
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    data: {title: 'Profil'},
    canActivate: [AuthGuard]
  },
  {
    path: 'classlist',
    loadChildren: './classlist/classlist.module#ClasslistModule',
    data: {title: 'Klassenliste'},
    canActivate: [AuthGuard, CanActivateProtectedPagesGuard]
  },
  {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule',
    data: {title: 'Chat'},
    canActivate: [AuthGuard, CanActivateProtectedPagesGuard]
  },


  // otherwise redirect to home
  {path: '**', component: The404Component}

];

