import { TestBed, inject } from '@angular/core/testing';

import { AuthmanagerService } from './authmanager.service';

describe('AuthmanagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthmanagerService]
    });
  });

  it('should be created', inject([AuthmanagerService], (service: AuthmanagerService) => {
    expect(service).toBeTruthy();
  }));
});
