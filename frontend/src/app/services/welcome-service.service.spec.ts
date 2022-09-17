import { TestBed } from '@angular/core/testing';

import { WelcomeServiceService } from './welcome-service.service';

describe('WelcomeServiceService', () => {
  let service: WelcomeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
