import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ROUTES } from './app.routes';

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(ROUTES) ],
//  imports: [ RouterModule.forRoot(routes, {enableTracing: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingKKModule {}
