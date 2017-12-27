import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockBackend } from '@angular/http/testing';

import { AppComponent } from './app.component';

import { NavComponent } from './header/nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule} from './app-routing.module';
import { HttpModule, BaseRequestOptions } from '@angular/http';

import { AuthGuard } from './_guards/auth.guards';
import { RegistrationAuthGuard } from './_guards/registrationAuth.guards';
import { CanActivateProtectedPagesGuard } from './_guards/can-activate-protected-pages.guard';

import { AlertService, AuthenticationService, UserService, ErrorHandlerService, ErrorLoggerService } from './_services/index';
import { DirectivesModule } from './_directives/directives.module';
import { ForgotPasswordComponent } from './login/forgot-password/forgot-password.component';

import { PersonalDetailsContainerModule } from './personal-details-container/personal-details-container.module';

import { ProfileModule } from './profile/profile.module';
import { RegistrationModule } from './registration/registration.module';

import { HttpWrapper } from './_services/http-wrapper.service';
import {UserAuthService, DbServiceUserAuth} from './_services/user-auth.service';
import { StorageService } from './_services/storage.service';
import { AppConfigClass } from './_helpers/app.config';
import {
  DbServiceUserContent,
  UserContentService
} from './_services/user-content.service';
import { UserContentDbService } from './_services/user-content-db.service';

import { NgDatepickerModule } from 'ng2-datepicker';
import { ImageCompressService } from 'ng2-image-compress';
import { The404Component } from './the404/the404.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    The404Component
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
    ProfileModule,
    RegistrationModule
  ],
  providers: [
    AuthGuard,
    RegistrationAuthGuard,
    AppConfigClass,
    DbServiceUserAuth,
    UserAuthService,
    AuthenticationService,
    DbServiceUserContent,
    UserContentService,
    StorageService,
    HttpWrapper,
    AlertService,
    UserService,
    MockBackend,
    BaseRequestOptions,
    ImageCompressService,
    CanActivateProtectedPagesGuard,
    ErrorHandlerService,
    ErrorLoggerService,
    { provide: ErrorHandler, useClass: ErrorHandlerService }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
