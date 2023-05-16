import { TestBed } from '@angular/core/testing';

import { GuardNameGuard } from './guard-name.guard';

describe('GuardNameGuard', () => {
  let guard: GuardNameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardNameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
