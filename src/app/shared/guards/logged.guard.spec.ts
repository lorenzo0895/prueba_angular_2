import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

import { loggedGuard } from './logged.guard';

describe('loggedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRouteSnapshot, useValue: {} },
        { provide: RouterStateSnapshot, useValue: {} },
      ]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

});
