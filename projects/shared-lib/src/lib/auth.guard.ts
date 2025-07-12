import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  if (authService.isAuthenticated()) {
    return true;
  } else {
    return false;
  }
};

export const authGuardRedirect = (redirectPath: String): CanActivateFn => {
  return (_route, _state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (authService.isAuthenticated()) {
      return true;
    } else {
      router.navigate([redirectPath]);
      return false;
    }
  }
};
