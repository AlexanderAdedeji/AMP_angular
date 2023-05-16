import { TestBed } from '@angular/core/testing';

import { AMPRouterCheckGuard } from './amprouter-check.guard';

describe('AMPRouterCheckGuard', () => {
  let guard: AMPRouterCheckGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AMPRouterCheckGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
