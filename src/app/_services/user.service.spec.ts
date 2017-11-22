import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import {MockBackend} from "@angular/http/testing";
import {HttpWrapperServiceMock} from "./http-wrapper.service.mock";
import {UserAuthServiceMock} from "./user-auth.service.mock";
import {BaseRequestOptions, ConnectionBackend, Http} from "@angular/http";
import {AuthenticationService} from "./authentication.service";
import {HttpWrapper} from "./http-wrapper.service";
import {UserAuthService} from "./user-auth.service";

fdescribe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService, MockBackend, BaseRequestOptions,
        {provide: HttpWrapper, useClass: HttpWrapperServiceMock},
        {provide: UserAuthService, useClass: UserAuthServiceMock},
        {provide: Http, useFactory: (mockBackend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(mockBackend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]},
        ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
