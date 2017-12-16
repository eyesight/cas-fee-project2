import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockBackend } from '@angular/http/testing';

import { AppComponent } from './app.component';

import { NavComponent } from './header/nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

import { AppRoutingModule} from './app-routing.module';
import { HttpModule, BaseRequestOptions } from '@angular/http';

import { AuthGuard } from './_guards/auth.guards';
import {CanActivateClassList, CanActivateChat} from "./_services/can-activate-classlist.service";

import { AlertService, AuthenticationService, UserService } from './_services/index';
import { DirectivesModule } from './_directives/directives.module';
import { TermsOfUseComponent } from './registration/terms-of-use/terms-of-use.component';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';

import { PersonalDetailsContainerModule } from './personal-details-container/personal-details-container.module';

import { ProfileModule } from './profile/profile.module'

import {HttpWrapper} from "./_services/http-wrapper.service";
import {UserAuthService} from "./_services/user-auth.service";
import {StorageService} from "./_services/storage.service";
import {AppConfigClass} from "./_helpers/app.config";
import {UserContentService} from "./_services/user-content.service";
import {UserContentDbService} from "./_services/user-content-db.service";

import { NgDatepickerModule } from 'ng2-datepicker';
import {ImageCompressService} from "ng2-image-compress";



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    TermsOfUseComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DirectivesModule,
    HttpModule,
    BrowserAnimationsModule,
    NgDatepickerModule,
    PersonalDetailsContainerModule,
    ProfileModule
  ],
  providers: [
    AuthGuard,
    AppConfigClass,
    UserAuthService,
    AuthenticationService,
    UserContentService,
    UserContentDbService,
    StorageService,
    HttpWrapper,
    AlertService,
    UserService,
    MockBackend,
    BaseRequestOptions,
    ImageCompressService,
    CanActivateChat,
    CanActivateClassList
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
