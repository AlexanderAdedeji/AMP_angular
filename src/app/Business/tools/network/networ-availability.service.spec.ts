import { TestBed } from '@angular/core/testing';

import { NetworAvailabilityService } from './networ-availability.service';

describe('NetworAvailabilityService', () => {
  let service: NetworAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
