/**
 * Created by awedag on 11.10.17.
 */

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { AppComponent } from './app.component';


export const ROUTES: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'classlist', loadChildren: './20_classlist/classlist.module#ClasslistModule', data: {title: 'Klassenliste'} },
  { path: 'chat',      loadChildren: './30_chat/chat.module#ChatModule', data: {title: 'Chat'} }

];

