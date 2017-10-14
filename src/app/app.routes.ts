/**
 * Created by awedag on 11.10.17.
 */

import { Routes } from '@angular/router';

import { AppComponent } from './app.component';


export const ROUTES: Routes = [
  { path: '', component: AppComponent, pathMatch: 'full' },
/*  { path: 'home', component: AppComponent, data: { title: 'Home' } },*/

  /*{ path: 'chat', component: ChatComponent, data: { title: 'Chat' } },
  */
  { path: 'chat', loadChildren: './30_chat/chat.module#ChatModule', data: {title: 'Chat'} }

];


/*
 export const ROUTES: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
 { path: 'home', component: HomeComponent, data: { title: 'Home' } },
 { path: '10_profile', loadChildren: './+todo-advanced-directive#TodoAdvancedDirectiveModule', data: { title: 'ClassList' } },
 {
 path: 'chat', loadChildren: './+todo-advanced-errorhandling#TodoAdvancedErrorhandlingModule',
 data: { title: 'Errorhandling' }
 },
 {
 path: 'chat', loadChildren: './+todo-advanced-errorhandling#TodoAdvancedErrorhandlingModule',
 data: { title: 'Errorhandling' }
 },
 { path: '**', component: NoContentComponent },
 ];
 */
