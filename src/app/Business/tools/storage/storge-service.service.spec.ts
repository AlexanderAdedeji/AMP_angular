import { TestBed } from '@angular/core/testing';

import { StorageService } from './storge-service.service';

describe('StorgeServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });
});
