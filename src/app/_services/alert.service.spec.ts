import { TestBed, inject } from '@angular/core/testing';
import { Router, NavigationStart } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from './alert.service';
import {AlertMessagesService} from "./alert-messages.service";

fdescribe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [AlertService, AlertMessagesService]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
