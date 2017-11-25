import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockBackend, MockConnection } from '@angular/http/testing';

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
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { AlertComponent } from './_directives/alert/alert.component';
import { ShowErrorsComponent } from './_directives/show-errors/show-errors.component';
import { DirectivesModule } from './_directives/directives.module';
import { TermsOfUseComponent } from './registration/terms-of-use/terms-of-use.component';

import {HttpWrapper} from "./_services/http-wrapper.service";
import {UserAuthService} from "./_services/user-auth.service";
import {StorageService} from "./_services/storage.service";
import {AppConfigClass} from "./_helpers/app.config";


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    RegistrationComponent,
    ShowErrorsComponent,
    TermsOfUseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    DirectivesModule,
    // injecst Http to any service
    HttpModule,
    BrowserAnimationsModule,

  ],
  providers: [
    AuthGuard,
    AppConfigClass,
    UserAuthService,
    StorageService,
    HttpWrapper,
    AuthenticationService,
    AlertService,
    UserService,

    // providers used to create fake backend
    //fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
