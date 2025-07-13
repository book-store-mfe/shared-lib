import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (_route, _state) => {
  const authService = inject(AuthService);
  if (authService.authenticated()) {
    return true;
  } else {
    return false;
  }
};

export const authGuardRedirect = (redirectPath: String): CanActivateFn => {
  return (_route, state) => {
    if (state.url === redirectPath) {
      return true;
    }
    const authService = inject(AuthService);
    if (authService.authenticated()) {
      return true;
    }
    const router = inject(Router);
    router.navigate([redirectPath]);
    return false;
  }
};
