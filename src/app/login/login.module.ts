import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {LoginRoutesModule} from "./login.routes";
import { DirectivesModule } from '../_directives/directives.module';
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutesModule,
    ReactiveFormsModule,
    DirectivesModule
  ],
  declarations: [LoginComponent,
  ForgotPasswordComponent]
})
export class LoginModule { }
