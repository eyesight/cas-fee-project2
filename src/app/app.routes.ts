import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guards';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';


export const ROUTES: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'Home' }, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, data: { title: 'Login' }},
  { path: 'registration', component: RegistrationComponent, data: { title: 'Registration' }},
  { path: 'classlist', loadChildren: './classlist/classlist.module#ClasslistModule', data: {title: 'Klassenliste'} },
  { path: 'chat',      loadChildren: './chat/chat.module#ChatModule', data: {title: 'Chat'} },

  // otherwise redirect to home
  { path: '**', redirectTo: 'home' }

];

