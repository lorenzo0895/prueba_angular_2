import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const notLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return localStorage.getItem('token')
    ? router.navigate(['..', 'shopping'])
    : true;
};
