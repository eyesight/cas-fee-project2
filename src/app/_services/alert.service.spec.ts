import { TestBed, inject } from '@angular/core/testing';
import { Router, NavigationStart } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertService } from './alert.service';

fdescribe('AlertService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [AlertService]
    });
  });

  it('should be created', inject([AlertService], (service: AlertService) => {
    expect(service).toBeTruthy();
  }));
});
