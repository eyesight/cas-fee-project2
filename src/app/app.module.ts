import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './00_login/login.component';
import { RegistrationComponent } from './01_registration/registration.component';

import { AppRoutingKKModule} from './app-routing.module';
import { HttpModule, BaseRequestOptions } from '@angular/http';

import { AuthGuard } from './_guards/auth.guards';
import { AlertService, AuthenticationService, UserService } from './_services/index';
import { AlertComponent } from './_helpers/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingKKModule,
    // injecst Http to any service
    HttpModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    AlertService,
    UserService,

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
