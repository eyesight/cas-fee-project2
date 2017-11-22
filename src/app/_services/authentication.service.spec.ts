import { TestBed, inject } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpWrapperServiceMock } from './http-wrapper.service.mock';
import { HttpWrapper } from './http-wrapper.service';
import {BaseRequestOptions, ConnectionBackend, Http} from "@angular/http";
import {MockBackend} from "@angular/http/testing";
import {UserAuthServiceMock} from "./user-auth.service.mock";
import {UserAuthService} from "./user-auth.service";
import {UserAuth} from "../_models/user.model";

fdescribe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService, MockBackend, BaseRequestOptions,
        {provide: HttpWrapper, useClass: HttpWrapperServiceMock},
        {provide: UserAuthService, useClass: UserAuthServiceMock},
        {provide: Http, useFactory: (mockBackend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(mockBackend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]},
      ]

    });
  });

  it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service).toBeTruthy();
  }));
  it('should be authenticated (with TestBed.get)', () => {
    const authService = TestBed.get(AuthenticationService);
    let response = null;
      authService.login('adf', 'adsf').map((user: UserAuth) => { console.log('response:' + user.email); response = user; } );
    console.log('responses:' + response.email);
    expect(response.email).toBe('testemail@com.ex');
  });
});
