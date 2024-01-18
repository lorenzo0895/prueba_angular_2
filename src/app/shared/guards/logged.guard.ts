import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return !localStorage.getItem('token')
    ? router.navigate(['..', 'login'])
    : true;
};
